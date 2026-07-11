/* ==========================================
   PROFOLIO - script.js
========================================== */

// ============================
// Smooth Scroll
// ============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if(target){

            target.scrollIntoView({

                behavior:'smooth',
                block:'start'

            });

        }

    });

});


// ============================
// Active Navigation
// ============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")=="#"+current){

            link.classList.add("active");

        }

    });

});


// ============================
// Navbar Shadow
// ============================

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        navbar.style.background="rgba(8,8,15,.96)";
        navbar.style.boxShadow="0 10px 35px rgba(0,0,0,.4)";

    }

    else{

        navbar.style.background="rgba(12,12,20,.75)";
        navbar.style.boxShadow="none";

    }

});


// ============================
// Reveal Animation
// ============================

const revealElements=document.querySelectorAll(

".highlight-box,.service-card,.step,.about-content,.contact,.image-card"

);

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.2

});

revealElements.forEach(el=>{

observer.observe(el);

});


// ============================
// Hero Button Ripple
// ============================

document.querySelectorAll(".btn-primary").forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const diameter=Math.max(

this.clientWidth,

this.clientHeight

);

circle.style.width=circle.style.height=diameter+"px";

circle.style.left=e.offsetX-diameter/2+"px";

circle.style.top=e.offsetY-diameter/2+"px";

circle.classList.add("ripple");

const ripple=this.getElementsByClassName("ripple")[0];

if(ripple){

ripple.remove();

}

this.appendChild(circle);

});

});


// ============================
// Counter Animation
// ============================

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

counter.innerText="0";

const update=()=>{

const target=+counter.getAttribute("data-target");

const count=+counter.innerText;

const increment=target/120;

if(count<target){

counter.innerText=Math.ceil(count+increment);

setTimeout(update,15);

}

else{

counter.innerText=target;

}

}

update();

});


// ============================
// Floating Animation
// ============================

const floating=document.querySelector(".image-card");

if(floating){

setInterval(()=>{

floating.classList.toggle("float");

},2000);

}


// ============================
// Contact Form
// ============================

const form=document.getElementById("appointmentForm");

if(form){

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const submitBtn=form.querySelector("button");

submitBtn.innerHTML="Sending...";
submitBtn.disabled=true;

const data={

name:form.name.value,

email:form.email.value,

phone:form.phone.value,

company:form.company.value,

service:form.service.value,

budget:form.budget.value,

meetingDate:form.meetingDate.value,

meetingTime:form.meetingTime.value,

description:form.description.value

};

try{

const response=await fetch("http://localhost:5000/api/contact",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

});

const result=await response.json();

if(result.success){

alert(

"✅ Appointment booked successfully!\n\nA confirmation email has been sent."

);

form.reset();

}

else{

alert(result.message);

}

}

catch(error){

alert(

"❌ Unable to connect to the server."

);

console.error(error);

}

submitBtn.innerHTML="Book Appointment";

submitBtn.disabled=false;

});

}


// ============================
// Scroll To Top
// ============================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.className="top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.style.opacity="1";

topBtn.style.visibility="visible";

}

else{

topBtn.style.opacity="0";

topBtn.style.visibility="hidden";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};


// ============================
// Console Message
// ============================

console.log("%cPROFOLIO",

"font-size:28px;color:#FF4DA6;font-weight:bold;");

console.log("%cBuild. Brand. Grow.","font-size:16px;color:#8A2BE2;");