(()=>{"use strict";function e(e){document.addEventListener("keydown",o),e.classList.add("popup_is-opened")}function t(e){e&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o))}function n(e){var n=e.currentTarget;e.target===n&&t(n)}function o(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}var r={baseUrl:"https://nomoreparties.co/v1/cohort-mag-4",headers:{authorization:"c61b35b3-df45-4438-93f5-d738502d68af","Content-Type":"application/json"}},a=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},c=function(){return fetch("".concat(r.baseUrl,"/users/me"),{method:"GET",headers:r.headers}).then(a)},i=function(){return fetch("".concat(r.baseUrl,"/cards"),{method:"GET",headers:r.headers}).then(a)};function u(e,t,n,o,r,a,c,i){var u=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),l=u.querySelector(".card__image"),d=u.querySelector(".card__title"),s=u.querySelector(".card__delete-button"),p=u.querySelector(".card__like-button"),_=u.querySelector(".card__like-counter");return l.src=e.link,d.textContent=e.name,l.alt=e.name,u.dataset.id=n,l.addEventListener("click",c),p.addEventListener("click",(function(){a(p,_)})),t===o?s.addEventListener("click",i):(t||void 0===o)&&s.remove(),0!==r.length&&(_.textContent=r.length),r.forEach((function(e){e._id===t&&p.classList.add("card__like-button_is-active")})),u}function l(e,t){var n;"card__like-button"===e.classList.value?(n=e.closest("[data-id]").dataset.id,fetch("".concat(r.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:r.headers}).then(a)).then((function(n){t.textContent=n.likes.length,e.classList.add("card__like-button_is-active")})).catch((function(e){console.log(e)})):"card__like-button card__like-button_is-active"===e.classList.value&&function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r.headers}).then(a)}(e.closest("[data-id]").dataset.id).then((function(n){t.textContent=n.likes.length,e.classList.remove("card__like-button_is-active"),0==n.likes.length&&(t.textContent="")})).catch((function(e){console.log(e)}))}function d(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}function s(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function p(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){d(e,n,t)}))}function _(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,a,c,i=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=a.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw r}}return i}}(e,t)||f(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){if(e){if("string"==typeof e)return y(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var m=document.querySelectorAll(".popup"),v=document.querySelector(".popup_type_new-card"),h=document.querySelector(".profile__add-button"),b=v.querySelector(".popup__form"),S=v.querySelector(".popup__input_type_card-name"),q=v.querySelector(".popup__input_type_url"),g=document.querySelector(".profile__edit-button"),L=document.querySelector(".popup_type_edit"),C=document.querySelector(".places__list"),E=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),x=L.querySelector(".popup__form"),w=L.querySelector(".popup__input_type_name"),A=L.querySelector(".popup__input_type_description"),T=document.querySelector(".popup_type_image"),U=T.querySelector(".popup__image"),j=T.querySelector(".popup__caption"),I=document.querySelector(".popup_type_delete-card"),O=I.querySelector(".popup__form"),P=document.querySelector(".profile__image"),D=document.querySelector(".profile__image__edit"),M=document.querySelector(".edit-profile-avatar"),B=M.querySelector(".popup__form"),N=M.querySelector(".popup__input_type_avatar"),J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function G(t){var n=t.target;U.src=n.src,j.textContent=n.alt,e(T)}function H(t){document.querySelectorAll("[data-state]").forEach((function(e){delete e.dataset.state})),t.target.parentElement.dataset.state="deleted",I.querySelector(".popup__button").dataset.loader="ready-to-download",e(I)}function z(e){e.reset()}function $(e){var t=document.querySelector("[data-loader]"),n=document.createElement("span");n.className="loading-indicator",n.textContent="...",e&"Сохранить"===t.textContent?(t.disabled=!0,t.classList.add("popup__button_disabled"),t.textContent="Сохранение",t.append(n),n.classList.add("popup__button-loading")):e&"Да"===t.textContent?(t.disabled=!0,t.classList.add("popup__button_disabled"),t.textContent="Удаление",t.append(n),n.classList.add("popup__button-loading")):!1===e&"Сохранение..."===t.textContent?(n.classList.remove("popup__button-loading"),t.textContent="Сохранить",delete t.dataset.loader,n.remove(),t.disabled=!1,t.classList.remove("popup__button_disabled")):!1===e&"Удаление..."===t.textContent&&(n.classList.remove("popup__button-loading"),t.textContent="Да",delete t.dataset.loader,n.remove(),t.disabled=!1,t.classList.remove("popup__button_disabled"))}h.addEventListener("click",(function(){z(b),p(b,J),v.querySelector(".popup__button").dataset.loader="ready-to-download",e(v)})),g.addEventListener("click",(function(){w.value=E.textContent,A.value=k.textContent,L.querySelector(".popup__button").dataset.loader="ready-to-download",L.querySelector(".popup__button").classList.add("popup__button_disabled"),L.disable=!0,p(x,J),e(L)})),x.addEventListener("submit",(function(e){var n,o;e.preventDefault(),$(!0),(n=w.value,o=A.value,fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:n,about:o})}).then(a)).then((function(e){E.textContent=e.name,k.textContent=e.about,t(L)})).catch((function(e){console.log(e)})).finally((function(){$(!1)}))})),b.addEventListener("submit",(function(e){e.preventDefault(),$(!0);var n,o,c={name:S.value,link:q.value};(n=S.value,o=q.value,fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:n,link:o})}).then(a)).then((function(e){var n=u(c,e.owner._id,e._id,e.owner._id,e.likes,l,G,H);C.prepend(n),t(v)})).catch((function(e){console.log(e)})).finally((function(){$(!1)}))})),O.addEventListener("submit",(function(e){e.preventDefault(),$(!0),Promise.all([c(),i()]).then((function(e){var n=_(e,2);(function(e,t){var n,o,c=C.querySelectorAll(".places__item"),i=0,u=function(e){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=f(e))){t&&(e=t);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a=!0,c=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return a=e.done,e},e:function(e){c=!0,r=e},f:function(){try{a||null==t.return||t.return()}finally{if(c)throw r}}}}(t);try{for(u.s();!(n=u.n()).done;){var l=n.value;if(e._id===l.owner._id&c[i].dataset.id===l._id&"deleted"===c[i].dataset.state){o=l._id,fetch("".concat(r.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:r.headers}).then(a).catch((function(e){console.log(e)})),c[i].remove();break}i++}}catch(e){u.e(e)}finally{u.f()}})(n[0],n[1]),t(I)})).catch((function(e){console.log(e)})).finally((function(){$(!1)}))})),B.addEventListener("submit",(function(e){var n;e.preventDefault(),$(!0),(n=N.value,fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:n})}).then(a)).then((function(e){P.style.backgroundImage="url(".concat(e.avatar,")"),t(M)})).catch((function(e){console.log(e)})).finally((function(){$(!1)}))})),D.addEventListener("click",(function(){z(B),p(B,J),M.querySelector(".popup__button").classList.add("popup__button_disabled"),M.querySelector(".popup__button").disable=!0,M.querySelector(".popup__button").dataset.loader="ready-to-download",e(M)})),m.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){t(e)})),e.addEventListener("mousedown",n),e.classList.add("popup_is-animated")})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);s(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?d(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));if(r.classList.add(o.errorClass),t.classList.add(o.inputErrorClass),t.validity.typeMismatch||t.validity.valueMissing)r.textContent=n;else if(t.validity.patternMismatch){var a=t.dataset.errorMessage;r.textContent=a}else t.validity.tooShort&&(r.textContent=n)}(e,t,t.validationMessage,n)}(e,r,t),s(n,o,t)}))}))}(t,e)}))}(J),Promise.all([c(),i()]).then((function(e){var t=_(e,2),n=t[0],o=t[1];P.style.backgroundImage="url(".concat(n.avatar,")"),E.textContent=n.name,k.textContent=n.about,o.forEach((function(e){var t=u(e,n._id,e._id,e.owner._id,e.likes,l,G,H);C.append(t)}))})).catch((function(e){console.log(e)}))})();