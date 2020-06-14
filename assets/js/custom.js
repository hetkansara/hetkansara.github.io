let main_js_script = document.createElement('script');
main_js_script.src="assets/js/main.js?"+Date.now();
document.body.append(main_js_script);


let dn_jsdelivr_script = document.createElement('script');
dn_jsdelivr_script.src="https://cdn.jsdelivr.net/npm/vue@2.6.11?"+Date.now();
document.body.append(dn_jsdelivr_script);

let vue_logic_script = document.createElement('script');
vue_logic_script.src="assets/js/vue-logic.js?"+Date.now();
document.body.append(vue_logic_script);