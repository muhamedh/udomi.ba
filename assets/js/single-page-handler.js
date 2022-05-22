var SPApp = {
    handleSectionVisibility : function(elements, spotlight_element){
        /**
         * All the elements which do not have to be in spotlight are hidden,
         * only the active section is visible
         * SPApp.handleSectionVisibility(["#pets-list","#individual-pet","#edit-pet","#add-pet","#user-page"], "#individual-pet");
         */
        $(elements.join(", ")).attr('hidden', true);
        
        $(spotlight_element).attr('hidden',false);
        $(spotlight_element).html("");
    }
}