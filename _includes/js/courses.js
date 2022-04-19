{% include sort-data-folder.liquid data = site.data.submissions sortKey = "title" %}
{% assign strings = site.data.strings %}
// const jsonCourses = JSON.parse('{{ itemsSorted | jsonify}}');

const filterForm = document.querySelector('[data-filter-form]');
const submitForm = document.querySelector('form');
const sortForm = document.querySelector('.sort-by');
const searchForm = document.querySelector('#search');
const importJsonCourses = String.raw`{{ itemsSorted | jsonify }}`;
importJsonCourses.replace("\\", "\\\\");
const jsonCourses = JSON.parse(importJsonCourses);

const importJsonCountries = String.raw`{{ site.data.countries | jsonify }}`;
importJsonCountries.replace("\\", "\\\\");
const jsonCountry = JSON.parse(importJsonCountries);;

const jsonFilters = JSON.parse('{{site.data.filters | jsonify}}');
const jsonLang = JSON.parse('{{site.data.lang | jsonify}}');
const coursesList = document.getElementById('courses-list');


// if (filterForm && sortForm && search) {

if (filterForm) {

    document.querySelectorAll('.button-clear-button').forEach(item => {
        item.hidden = true;
        item.addEventListener('click', e => { clearFilters() });
    })

    filterForm.addEventListener('change', el => {
        filterJson();
    });

    sortForm.querySelector('select').addEventListener('change', el => {
        filterJson();
    });

    searchForm.addEventListener('keyup', el => {
        filterJson();
    });
    searchForm.addEventListener('search', () => {
        filterJson();
    })


    searchForm.onkeydown = function (e) {
        e = e || window.event;
        switch (e.which || e.keyCode) {
              case 13 : handleKeyboardSearch();
                  break;
        }
      }


    //Add pre-counters to filters
    showFilterCounters(filterForm);


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
                    
                    attValues.push({optionID: filter.value, optionName: filter.options[filter.selectedIndex].text})
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

            if (
                o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.topics.join().toLowerCase().includes(searchTerm.toLowerCase())) {
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
        
        updateSelectFilters(newResults.map(e => e.language), newResults.map(e => e.country));
                
        filtersOn.forEach(el => {
            if(el.filterId === "language" || el.filterId === "country")
                document.getElementById(el.filterId).value = el.filterValues[0].optionID;
        })
            
    }

    function updateSelectFilters(langs, countries) {
        langs = langs.flat();
        langs = [...new Set(langs)];
        selectLang = filterForm.querySelector('#language')
        selectLang.length = 0;
        var opt = document.createElement("option");
        opt.value = "";
        opt.innerHTML = "--{{strings.select_option_default}}--";
        selectLang.appendChild(opt);

        countries = countries.flat();
        countries = [...new Set(countries)];
        selectCountry = filterForm.querySelector('#country');
        selectCountry.length = 0;
        opt = document.createElement("option");
        opt.value = "";
        opt.innerHTML = "--{{strings.select_option_default}}--";
        selectCountry.appendChild(opt);

        langs.forEach(l => {
            opt = document.createElement("option");
            opt.value = l;
            opt.innerHTML = jsonLang[l].name + " (" + jsonLang[l].nativeName + ")";
            selectLang.appendChild(opt);
        })
        countries.forEach(c => {
            opt = document.createElement("option");
            opt.value = c;
            opt.innerHTML = jsonCountry[c].name + " (" + jsonCountry[c].nativeName + ")";
            selectCountry.appendChild(opt);
        })
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

        newContent.innerText = Object.values(newResults).length + " {{strings.courses}}";
        
        if (Object.values(newResults).length === 1) {
            newContent.innerText = Object.values(newResults).length + " {{strings.course}}";
        } 

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
            document.querySelector("#status").focus();
        }
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


