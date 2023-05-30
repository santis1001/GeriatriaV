const collapsables = document.querySelectorAll('.collapse');
collapsables.forEach(collapsable => {
    const radios = document.querySelectorAll(`input[name="${collapsable.getAttribute("radio-family")}"]`);
    radios.forEach(radio => {
        radio.addEventListener('change', (event)=>{
            const is_Collapse = radio.getAttribute('class').includes("collapsable");
            const CollapsableElement = document.getElementById(`${collapsable.getAttribute("id")}`);
            var bsCollapse = new bootstrap.Collapse(CollapsableElement, {
                toggle: false 
              })
            if(is_Collapse){
                console.log("trigger");
                bsCollapse.show();
            }else{
                bsCollapse.hide();
            }
        });
    });
});