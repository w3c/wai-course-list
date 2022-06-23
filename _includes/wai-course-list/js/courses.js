{% include wai-course-list/sort-data-folder.liquid data = site.data.wai-course-list.submissions sortKey = "title" %}
{% assign strings = site.data.wai-course-list.strings %}
// const jsonCourses = JSON.parse('{{ itemsSorted | jsonify}}');

const filterForm = document.querySelector('[data-filter-form]');
const sortForm = document.querySelector('.sort-by');
const searchForm = document.querySelector('#search');
const regionMainStatus = document.querySelector('#status');

const selectLang = document.querySelector('#language');
const selectCountry = document.querySelector('#country');
const selectLangOptions = document.querySelectorAll('#language option');
const selectCountryOptions = document.querySelectorAll('#country option');
const selectTotal = document.querySelectorAll('.total-select-courses');
const selectLangTotal = document.querySelector('#total-lang-courses');
const selectCountryTotal = document.querySelector('#total-country-courses');

const importJsonCourses = String.raw`{{ itemsSorted | jsonify }}`;
importJsonCourses.replace("\\", "\\\\");
const jsonCourses = JSON.parse(importJsonCourses);
const totalCourses = jsonCourses.length;

const importJsonCountries = String.raw`{{ site.data.wai-course-list.countries | jsonify }}`;
importJsonCountries.replace("\\", "\\\\");
const jsonCountry = JSON.parse(importJsonCountries);;

const jsonFilters = JSON.parse('{{site.data.wai-course-list.filters | jsonify}}');
const jsonLang = JSON.parse('{{site.data.lang | jsonify}}');
const coursesList = document.getElementById('courses-list');

const submitForm = document.querySelector('form');

// if (filterForm && sortForm && search) {

if (filterForm) {


    document.querySelectorAll('.button-clear-button').forEach(item => {
        item.hidden = true;
        item.addEventListener('click', e => { clearFilters() });
    })

    filterForm.addEventListener('change', filterJson);
    console.log(filterForm);
    searchForm.addEventListener('keyup', filterJson);
    searchForm.addEventListener('search', filterJson);    
    searchForm.onkeydown = function (e) {
        e = e || window.event;
        switch (e.which || e.keyCode) {
              case 13 : handleKeyboardSearch();
                  break;
        }
      }


    
    sortForm.querySelector('select').addEventListener('change', filterJson);

    handleARIAselect(selectLang);
    handleARIAselect(selectCountry);
    
    
    //Add pre-counters to filters
    showFilterCounters(filterForm);
    handleSelectFilters(jsonCourses);

    

    function showFilterCounters(filterForm) {

        filterForm.querySelectorAll('fieldset').forEach(filterTypeFS => {

            filterTypeFS.querySelectorAll('input[type="checkbox"]').forEach(filter => {

                var criteria = getActiveFiltersList(filterForm);

                var currentFilterID = filterTypeFS.id;
                var currentFilterName = filterTypeFS.querySelectorAll('legend')[0].innerText;

                criteria.push({ filterId: currentFilterID, filterName: currentFilterName, filterValues: [{optionID: filter.name, optionName: filterTypeFS.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText}] });

                var newResults = filterNewResultsList(criteria);
                var counterCurrentFilter = newResults.length;
                filterTypeFS.querySelector("label[for='" + filter.id + "']").querySelector('.filterPreCounter').innerText = "(" + counterCurrentFilter + ")";

            })

        })
    }

    function filterJson() {
        //form = document.querySelector('[data-filter-form]');

        var filtersOn = getActiveFiltersList(filterForm);
        var newResults = [];
        newResults = filterNewResultsList(filtersOn);


        //rebuild document
        rebuildList(newResults, filtersOn);
    }

    function getActiveFiltersList(form) {
        var activeFiltersList = [];
        var attValues = [];

        // for each attribute group
        form.querySelectorAll('fieldset').forEach(att => {

            attValues = [];
            filterName = att.querySelectorAll('legend')[0].innerText;

            att.querySelectorAll('input[type="checkbox"]').forEach(filter => {
                if (filter.checked) {
                    //attValues.push(att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText);
                    attValues.push({optionID: filter.name, optionName: att.querySelector("label[for='" + filter.id + "']").querySelector('.filterName').innerText});
                }
            })
            if (attValues.length > 0) {
                activeFiltersList.push({ filterId: att.id, filterName: filterName, filterValues: attValues });
            }

            att.querySelectorAll('select').forEach(filter => {
                attValues = [];
                if (filter.value !== "") {
                    var oName = "";
                    
                    if(filter.id == "language" )
                        oName = jsonLang[filter.value].name + " (" + jsonLang[filter.value].nativeName + ")";
                    else if (filter.id == "country" )
                        oName = jsonCountry[filter.value].name + " (" + jsonCountry[filter.value].nativeName + ")";
                    
                    attValues.push({optionID: filter.value, optionName: oName})
                    activeFiltersList.push({ filterId: filter.id, filterName: filterName, filterValues: attValues });
                }

            });

        });

        //console.log(activeFiltersList);
        return activeFiltersList;
    }

    function filterNewResultsList(filtersOnList) {
        var newResultsList = [];
        
        // by attribute
        filtersOnList.forEach(filter => {
            
            newResultsList.push(Object.values(jsonCourses).filter((x) => filter.filterValues.some(
                function (r) {
                    if (x[filter.filterId] !== undefined) {
                        return x[filter.filterId].includes(r.optionID);
                    } else {
                        return false;
                    }
                })));
        })

        // if no filter, show all courses
        if (newResultsList.length === 0)
            newResultsList = jsonCourses;
        // intersection between results [courses]
        else
            newResultsList = newResultsList.reduce((a, c) => a.filter(i => c.includes(i)));


        var searchTerm = searchForm.value;
        var searchedResults = [];

        Object.values(newResultsList).forEach(o => {
            var topics;
            if(Array.isArray(o.topics))
                topics = o.topics.join();
            else
                topics = o.topics;
            if (
                o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                topics.toLowerCase().includes(searchTerm.toLowerCase())) {
                searchedResults.push(o);
            }
        })

        return searchedResults;
    }

    function rebuildList(newResults, filtersOn) {
        
        const articles = coursesList.querySelectorAll('aside');

        //Sort items
        var list = document.querySelector('.courses-list');
        var sortedArticles = Array.from(articles);

        newResults.sort(sortList);

        sortedArticles.sort(function (a, b) {
            return newResults.findIndex(x => x.title === a.id) - newResults.findIndex(x => x.title === b.id);
        });

        list.innerHTML = "";

        for (i = 0; i < sortedArticles.length; ++i) {
            list.appendChild(sortedArticles[i]);
        }

        sortedArticles.forEach(el => {
            if (!Object.values(newResults).find(o => o.title === el.id))
                el.hidden = true;
            else
                el.hidden = false;
        })
        updateHeaderList(newResults, filtersOn);
        showFilterCounters(filterForm);
        handleSelectFilters(newResults);
        
                
        filtersOn.forEach(el => {
            if(el.filterId === "language" || el.filterId === "country")
                document.getElementById(el.filterId).value = el.filterValues[0].optionID;
        })
            
    }

    function handleSelectFilters(newResults){

        
        var totalSelects = updateSelectFiltersOptions(newResults.map(e => e.language), newResults.map(e => e.country));
        updateSelectFiltersCounters(newResults, totalSelects);
       
    }


    function updateSelectFiltersOptions(langs, countries) {

        
        langs = langs.flat();
        const countsLang = {};
        langs.forEach((x) => {
            countsLang[x] = (countsLang[x] || 0) + 1;
        });
        
        countries = countries.flat();
        const countsCountry = {};
        countries.forEach((x) => {
            countsCountry[x] = (countsCountry[x] || 0) + 1;
        });
        
        
        langs = [...new Set(langs)];
        
        if (selectLang.selectedIndex == 0)
            selectLang[0].innerHTML = "--{{strings.select_option_default}}--";
        else
            selectLang[0].innerHTML = "--{{strings.select_remove_option}}--";
        
        selectLangOptions.forEach(s => {
            
            l = jsonLang[s.value];
            
            if(l !== undefined)
                s.innerHTML = l.name + " (" + l.nativeName  + ")" + " ("+(countsLang[s.value]===undefined?"0":countsLang[s.value])+")";
            
        })

        countries = [...new Set(countries)];

        if (selectCountry.selectedIndex == 0)
         selectCountry[0].innerHTML = "--{{strings.select_option_default}}--";
        else
            selectCountry[0].innerHTML = "--{{strings.select_remove_option}}--";
    

        selectCountryOptions.forEach(s => {

            c = jsonCountry[s.value];

            if (c !== undefined)
                s.innerHTML = c.name + " (" + c.nativeName  + ")" + " ("+(countsCountry[s.value]===undefined?"0":countsCountry[s.value])+")";

        })
        
        return {totalLangAvailable: langs.length, totalCountriesAvailable: countries.length};

    }

    function updateSelectFiltersCounters(newResults, totalSelects){

        if(newResults.length === 0){
            selectTotal.forEach(s => {
                s.innerHTML = '{{strings.no_results_simple}}';
            })
            selectLangTotal.innerHTML = '';
            selectCountryTotal.innerHTML = '';
            
        }
        else{
                
            selectTotal.forEach(s => {
                s.innerHTML = newResults.length;

                if (newResults.length == 1){
                    if(s.id.includes('lang'))
                        s.innerHTML += ' {{strings.select_result_course_language}}';
                    else if (s.id.includes('country'))
                        s.innerHTML += ' {{strings.select_result_course_country}}';
                }
                else {
                    if(s.id.includes('lang'))
                        s.innerHTML += ' {{strings.select_results_courses_language}}';
                    else if (s.id.includes('country'))
                        s.innerHTML += ' {{strings.select_results_courses_country}}';
                }
            })
            

            selectLangTotal.innerHTML = totalSelects.totalLangAvailable;
            selectCountryTotal.innerHTML = totalSelects.totalCountriesAvailable;

            
            if(totalSelects.totalLangAvailable === 1)
                selectLangTotal.innerHTML += ' {{strings.select_language_info_single_result}}';
            else
                selectLangTotal.innerHTML += ' {{strings.select_language_info_multiple_results}}';

            if(totalSelects.totalCountriesAvailable === 1)
                selectCountryTotal.innerHTML += ' {{strings.select_country_info_single_result}}';
            else
                selectCountryTotal.innerHTML += ' {{strings.select_country_info_multiple_results}}';
        }
    }


    function updateHeaderList(newResults, filtersOn) {

        
        var listFiltersOnString = document.createElement('dl');
        var totalCoursesCounter = document.getElementById("total-courses");

        filtersOn.forEach(f => {

            var attName = document.createElement('dt');
            attName.innerText = f.filterName + ':';
            listFiltersOnString.appendChild(attName);

            var attValues = document.createElement('dd');

            if (f.filterId == 'language' || f.filterId == 'country'){
                attValues.innerText = f.filterValues[0].optionName;
            }
            else{
                // attValues.innerText = f.filterValues.join(', ');
                attValues.innerText = "";
                f.filterValues.forEach((fv, i) => {
                    attValues.innerText += fv.optionName;
                    if (i != (f.filterValues.length - 1)) {
                        attValues.innerText += "; ";
                      }
                })
            }
                
            listFiltersOnString.appendChild(attValues);
        });

        totalCoursesCounter.innerText = "{{strings.showing}} ";
        var newContent = document.createElement("span");
            
        totalCoursesCounter.appendChild(newContent);

        document.querySelector('.excol-all').hidden = false;

        newContent.innerText = Object.values(newResults).length;
                
        if(Object.values(newResults).length != totalCourses){
            newContent.innerText += " {{strings.from}} " + totalCourses;
        }

        newContent.innerText += " {{strings.courses}}";
        
        var searchTerm = searchForm.value;


        if (searchTerm.length > 0) {
            var attName = document.createElement('dt');
            attName.innerText = "{{strings.searchterm}}: ";
            listFiltersOnString.appendChild(attName);

            var attValues = document.createElement('dd');
            attValues.innerText = "\"" + searchTerm + "\"";
            listFiltersOnString.appendChild(attValues);
        }

        var titleResults = document.querySelector('#filter-courses-info h4');
        var filterCoursesString = document.querySelector('.details-criteria');
        filterCoursesString.innerText = "";


        if (filtersOn.length > 0 || searchTerm.length > 0) {
            filterCoursesString.appendChild(listFiltersOnString);
            document.querySelector('.results-box').classList.remove('hidden-element');
            hideClearButton(false);
        } else {
            hideClearButton(true);
            document.querySelector('.results-box').classList.add('hidden-element');
        }


        if (Object.values(newResults).length === 0) {
            document.getElementById('default-results-title').classList.add("hidden-element");
            document.getElementById('no-results-title').classList.remove("hidden-element");
            filterCoursesString.appendChild(listFiltersOnString);
            document.querySelector('.excol-all').hidden = true;
        }
        else {
            document.getElementById('default-results-title').classList.remove("hidden-element");
            document.getElementById('no-results-title').classList.add("hidden-element");
        }
    }


    function sortList(a, b) {
        var selectedSort = document.querySelector('.sort-by').querySelector('select').value;
        if (selectedSort == "alphabeticallyaz") {
            return a.title.localeCompare(b.title);
        } else if (selectedSort == "alphabeticallyza") {
            return b.title.localeCompare(a.title);
        } else if (selectedSort == "recentlyupdated") {
            return new Date(b.info_last_updated) - new Date(a.info_last_updated);
        }
        return false;
    }

    function hideClearButton(isHidden) {
        document.querySelectorAll('.button-clear-button').forEach(item => { item.hidden = isHidden });
    }



    function clearFilters() {
        //rebuildList(jsonCourses, []);
        filterForm.querySelectorAll("input[type='checkbox']").forEach(el => el.checked = false);
        filterForm.querySelectorAll("select").forEach(el => el.selectedIndex = 0);
        document.getElementById("search").value = "";
        filterJson();
        hideClearButton(true);
    }


    function clean(obj) {
        for (var propName in obj) {
            if (obj[propName].length === 0) {
                delete obj[propName];
            }
        }
        return obj
    }

    function handleKeyboardSearch(){
        if(searchForm.value !== ""){
            regionMainStatus.focus();
        }
    }

    function handleARIAselect(select){
        
        select.addEventListener('focus', toogleOffARIA);
        select.addEventListener('change', toogleOffARIA);
        select.addEventListener('blur', toogleOnARIA);   
        select.addEventListener('keyup', function(event){
            if (event.keyCode === 13) toogleOnARIA(); 
        })
    }

    function toogleOffARIA(){
        regionMainStatus.removeAttribute('aria-live');
        regionMainStatus.removeAttribute('role');
    }

    function toogleOnARIA(){
       
        txt = regionMainStatus.innerHTML;
        regionMainStatus.innerHTML = "";

        regionMainStatus.setAttribute('role','status');
        regionMainStatus.setAttribute('aria-live','polite');

        regionMainStatus.innerHTML = txt;
    }
    
}


if (submitForm) {

    _addLine();

    submitForm.querySelectorAll('.other_field input[type="radio"]').forEach(item => {
        item.addEventListener('change', changeHandlerOtherField);
    });


    function _addLine() {
        var buttonsAdd = document.querySelectorAll('button.add_line');

        Array.prototype.forEach.call(buttonsAdd, function addClickListener(button) {
            button.addEventListener('click', function (event) {
                var parent = event.target.parentNode;
                var lines = parent.querySelectorAll('.line');
                var proto = parent.querySelector('.proto');
                var newLine = proto.cloneNode(true);

                newLine.classList.remove('proto');
                newLine.classList.add('line');
                newLine.innerHTML = newLine.innerHTML.replace(/\[n\]/g, lines.length + 1);

                proto.parentNode.insertBefore(newLine, proto);

                newLine.querySelector('input, checkbox, select').disabled = false;
                newLine.querySelector('input, checkbox, select').focus();
                newLine.querySelector('input, checkbox, select').classList.remove('input_hidden');

                parent.querySelector('button.remove_line').disabled = false;

            });
        });

        var buttonsRemove = document.querySelectorAll('button.remove_line');

        Array.prototype.forEach.call(buttonsRemove, function addClickListener(button) {
            button.addEventListener('click', function (event) {
                var parent = event.target.parentNode;
                var lines = parent.querySelectorAll('.line');
                var last = lines[lines.length - 1];

                last.parentNode.removeChild(last);

                lines = parent.querySelectorAll('.line');
                last = lines[lines.length - 1];
                last.querySelector('input, checkbox, select').focus();

                if (lines.length <= 1)
                    button.disabled = true;
            });
        });

    }

    function changeHandlerOtherField() {

        var newField = this.parentNode.parentNode.querySelector('input[type="text"]');

        if (this.classList.contains('option_field_other')) {
            newField.parentNode.classList.remove('hidden-element');
            newField.focus();
        }
        else
            newField.parentNode.classList.add('hidden-element');
    }
}


