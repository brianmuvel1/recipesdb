import"./Layout.astro_astro_type_script_index_0_lang.BzHAMJTp.js";const y=document.getElementById("searchContainer"),u=document.getElementById("search"),i=document.getElementById("chips"),p=document.querySelectorAll(".category-filter");let n=new Set,s=new Set;function v(e){const t=document.createElement("div");return t.className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm",t.innerHTML=`
      <span>${e}</span>
      <button type="button" class="remove-chip hover:text-blue-600" aria-label="Remove ${e}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    `,t.querySelector(".remove-chip")?.addEventListener("click",()=>{s.delete(e),t.remove(),l()}),t}function d(e){e=e.trim().toLowerCase(),e&&!s.has(e)&&(s.add(e),i?.appendChild(v(e)),l())}function f(e){const t=e.target;if(e.key===",")e.preventDefault(),t.value.split(",").forEach(r=>d(r)),t.value="";else if(e.key==="Enter"&&t.value)d(t.value),t.value="";else if(e.key==="Backspace"&&t.value===""&&i?.lastChild){const a=i.lastChild,r=a.querySelector("span")?.textContent?.toLowerCase()||"";s.delete(r),a.remove(),l()}}function C(e){const t=e.querySelector("h2")?.textContent?.toLowerCase()||"",a=Array.from(e.querySelectorAll(".ingredients li")).map(o=>o.textContent?.toLowerCase()||""),r=Array.from(e.querySelectorAll(".category-chip")).map(o=>o.textContent?.toLowerCase().trim()||"");return[t,...a,...r]}function l(){document.querySelectorAll("article").forEach(t=>{const a=C(t),r=t.querySelectorAll(".category-chip"),o=new Set(Array.from(r).map(c=>c.textContent?.trim())),h=s.size===0||Array.from(s).some(c=>a.some(g=>g.includes(c))),m=n.size===0||Array.from(n).some(c=>o.has(c));t.classList.toggle("hidden",!(h&&m))})}y?.addEventListener("click",()=>{u?.focus()});u?.addEventListener("keydown",f);p.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-category")||"";n.has(t)?(n.delete(t),e.classList.remove("bg-blue-100","text-blue-800"),e.classList.add("bg-gray-200","text-gray-700")):(n.add(t),e.classList.add("bg-blue-100","text-blue-800"),e.classList.remove("bg-gray-200","text-gray-700")),l()})});
