const options = { year: 'numeric', month: 'long', day: 'numeric' };

function getPreviewSubmission() {

    const overlay = document.getElementById("preview-submission-overlay");
    const overlayContent = overlay.querySelector(".overlay-content");
    const dataForm = document.querySelector('[name="submission"]');



    overlayContent.querySelectorAll('.button-close_preview').forEach(el => {
        el.addEventListener('click', e => {
            closePreviewOverlay();
        })
    })

    overlayContent.querySelector('.button-submit_form').addEventListener('click', e => {
        dataForm.submit();
    })

    overlay.style.display = "flex";


    var detailsPreview = document.querySelector(".details-preview");

    detailsPreview.innerText = "";

    var list = document.createElement("dl");
    detailsPreview.appendChild(list);





    Array.from(dataForm.elements).forEach(el => {

        var elType = el.getAttribute("type");

        if(el.id == "description"){

            var label = document.querySelector("label[for='" + el.id + "']");
            if(label === null) 
                label = el.closest('fieldset').querySelector('legend');


            var value = "";
            if (el.value === "") value = "{{strings.not_provided}}";
            else {
                value = el.value;

                if (elType === "date") {
                    value = new Date(value);
                    value = value.toLocaleDateString(undefined, options);
                }
            }

            var finalLabel = label.cloneNode(true);
            clearChildNodes(finalLabel);

            appendList(finalLabel.innerText, value);

        }

        if ((elType === "text" || elType === "email" || elType === "url" || elType === "date") && (!el.classList.contains('input_hidden')) && (!el.classList.contains('new-option-field'))) {

            var label = document.querySelector("label[for='" + el.id + "']");
            if(label === null) 
                label = el.closest('fieldset').querySelector('legend');


            var value = "";
            if (el.value === "") value = "{{strings.not_provided}}";
            else {
                value = el.value;

                if (elType === "date") {
                    value = new Date(value);
                    value = value.toLocaleDateString(undefined, options);
                }
            }

            var finalLabel = label.cloneNode(true);
            clearChildNodes(finalLabel);

            appendList(finalLabel.innerText, value);
        }
        if (el.classList.contains('fieldset_radio')) {

            var radiosChecked = el.querySelector("input[type='radio']:checked");
            var label = el.querySelector("legend");

            var value = "";
            if (radiosChecked) value = document.querySelector("label[for='" + radiosChecked.id + "']").innerText;
            else value = "{{strings.not_provided}}";

            var newField = el.querySelector('.new-option-field');

            if (newField && newField.value) {
                value += " (" + newField.value + ")";
            }
           
            var finalLabel = label.cloneNode(true);
            clearChildNodes(finalLabel);
           
            appendList(finalLabel.innerText, value);

        }
        if (el.classList.contains('fieldset_select_text')) {

            var selectedFilled = el.querySelectorAll(".select_form:not(.input_hidden)");
            var selectValues = [];

            selectedFilled.forEach(function (e) {
                var val = e.options[e.selectedIndex].text;
                if (val !== "") selectValues.push(val);
            });

            var label = el.querySelector("legend");
            var value = (selectValues.length === 0 ? "{{strings.not_provided}}" : selectValues.join(', '));

            var finalLabel = label.cloneNode(true);
            clearChildNodes(finalLabel);

            appendList(finalLabel.innerText, value);

        }
        if (el.classList.contains('fieldset_check') || el.classList.contains('fieldset_check_title')) {


            var checks = el.querySelectorAll("input[type='checkbox']:checked");

            if (checks) {
                if (el.classList.contains('fieldset_check_title')) {

                    var finalLabel = el.querySelector('legend');
                    var finalValue = [];

                    el.querySelectorAll('.subitems').forEach(d => {

                        var checkedValues = d.querySelectorAll("input[type='checkbox']:checked");
                        var val = [];

                        checkedValues.forEach(c => {
                            val.push(el.querySelector("label[for='" + c.id + "']").innerText);
                        })

                        var label = d.querySelector('legend').innerText;

                        var value = label + ": " + (val.length === 0 ? "{{strings.not_provided}}" : val.join('; '));

                        finalValue.push(value);

                    });

                    //console.log(finalLabel);
                    //console.log(finalValue);                    

                    var finalLabel2 = finalLabel.cloneNode(true);
                    clearChildNodes(finalLabel2);
        
                    appendList(finalLabel2.innerText, finalValue, true);


                }
                else {

                    var selectedFilled = el.querySelectorAll(".select_form:not(.input_hidden)");
                    var selectValues = [];

                    checks.forEach(function (e) {
                        val = el.querySelector("label[for='" + e.id + "']").innerText;
                        if (val !== "") selectValues.push(val);
                    });

                    var label = el.querySelector("legend");
                    var value = (selectValues.length === 0 ? "{{strings.not_provided}}" : selectValues.join('; '));
                    

                    var finalLabel = label.cloneNode(true);
                    clearChildNodes(finalLabel);
        
                    
                    appendList(finalLabel.innerText, value);
                }
            }


            //var label = getFieldsetText(el.querySelector("legend"));


            // appendList(label, value);


        }
        
    });

    handleKeyboard();

    function appendList(label, value, isSubList = false) {

        var listItem = document.createElement("dt");
        listItem.innerText = label;
        list.appendChild(listItem);

        if (isSubList) {

            value.forEach(v => {
                var listValue = document.createElement("dd");
                listValue.innerText = v;
                list.appendChild(listValue);
            });

        }
        else {
            var listValue = document.createElement("dd");
            listValue.innerText = value;
            list.appendChild(listValue);
        }
    }

    function clearChildNodes(el){
        while (el.childNodes.length > 1) {
            el.removeChild(el.lastChild);
        }
        return el;
    }


    function closePreviewOverlay() {
        overlay.style.display = "none";
        document.activeElement.blur();

        document.removeEventListener('keydown', handleKeyDown, false);

    }

    function getFieldsetText(str) {
        if (str.querySelector('h3'))
            return str.querySelector('h3').innerText;
        return str.innerText;
    }



    function handleKeyboard() {

        overlayContent.querySelector('button').focus();
        
        window.addEventListener("keyup", function (event) {
            if (event.key === "Escape")
                closePreviewOverlay();

        })

        document.addEventListener('keydown', handleKeyDown, false);
    }


    function handleKeyDown(e) {
        let tab = 9; // the keycode for tab

        if (e.keyCode == tab) {

            let focusableElements = overlay.querySelectorAll('button, a, textarea, input')
            let focusableElementsAmount = focusableElements.length;

            if (focusableElementsAmount == 1) {
                e.preventDefault();
                return false;
            }

            let firstElement = focusableElements[0];
            let lastElement = focusableElements[focusableElementsAmount - 1];
            let shiftPressed = e.shiftKey;

            if (e.target == lastElement && !shiftPressed) {
                e.preventDefault();
                firstElement.focus();
            }

            if (e.target == firstElement && shiftPressed) {
                e.preventDefault();
                lastElement.focus();
            }
        }
    }


}
