/*==========================================
    PONZDZ STORE
    Premium Digital Marketplace
    Core Engine v1.0
==========================================*/

"use strict";

/*==========================================
    DOM
==========================================*/

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

/*==========================================
    APP
==========================================*/

const APP = {

    init() {

        this.removeLoading();

        this.initBackToTop();

        this.initScrollReveal();

        this.initNavbar();

        console.log(
            "%cPONZDZ STORE",
            "color:#38d9ff;font-size:24px;font-weight:bold;"
        );

        console.log(
            "%cPremium Digital Marketplace",
            "color:#8b5cf6;font-size:14px;"
        );

    },

/*==========================================
    BACK TO TOP
==========================================*/

    initBackToTop(){

        const btn=$("#backToTop");

        if(!btn) return;

        window.addEventListener("scroll",()=>{

            if(window.scrollY>500){

                btn.style.opacity="1";

                btn.style.pointerEvents="auto";

            }else{

                btn.style.opacity="0";

                btn.style.pointerEvents="none";

            }

        });

        btn.addEventListener("click",()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    },

/*==========================================
    SCROLL REVEAL
==========================================*/

    initScrollReveal(){

        const items=$$(".reveal");

        if(items.length===0) return;

        const observer=new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("active");

                }

            });

        },{

            threshold:.15

        });

        items.forEach(item=>{

            observer.observe(item);

        });

    },

/*==========================================
    NAVBAR
==========================================*/

    initNavbar(){

        const header=$("header");

        if(!header) return;

        let lastScroll=0;

        window.addEventListener("scroll",()=>{

            const current=window.scrollY;

            if(current>120){

                header.classList.add("sticky");

            }else{

                header.classList.remove("sticky");

            }

            if(current>lastScroll && current>200){

                header.style.transform="translateY(-100%)";

            }else{

                header.style.transform="translateY(0)";

            }

            lastScroll=current;

        });

    }

};

/*==========================================
    START
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    APP.init();

});
/*==========================================
    SPACE ENGINE
==========================================*/

Object.assign(APP,{

    /*======================================
        SPACE INIT
    ======================================*/

    initSpace(){

        this.heroParallax();

        this.randomMeteor();

    },

    /*======================================
        HERO PARALLAX
    ======================================*/

    heroParallax(){

        const hero=document.querySelector(".hero");

        const core=document.querySelector(".energy-core");

        if(!hero || !core) return;

        hero.addEventListener("mousemove",(e)=>{

            const rect=hero.getBoundingClientRect();

            const x=(e.clientX-rect.left)/rect.width-.5;

            const y=(e.clientY-rect.top)/rect.height-.5;

            core.style.transform=
            `translate(${x*20}px,${y*20}px) rotate(${x*8}deg)`;

        });

        hero.addEventListener("mouseleave",()=>{

            core.style.transform="translate(0,0) rotate(0deg)";

        });

    },

    /*======================================
        RANDOM METEOR
    ======================================*/

    randomMeteor(){

        setInterval(()=>{

            const meteor=document.createElement("div");

            meteor.className="meteor";

            meteor.style.left=Math.random()*window.innerWidth+"px";

            meteor.style.top="-80px";

            document.body.appendChild(meteor);

            setTimeout(()=>{

                meteor.remove();

            },2500);

        },7000);

    }

});

/*==========================================
    START SPACE ENGINE
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    APP.initSpace();

});
/*==========================================
    UI ENGINE
==========================================*/

Object.assign(APP,{

    /*======================================
        UI INIT
    ======================================*/

    initUI(){

        this.counterAnimation();

        this.liveClock();

        this.cardTilt();

    },

    /*======================================
        COUNTER
    ======================================*/

    counterAnimation(){

        const counters=document.querySelectorAll("[data-count]");

        if(!counters.length) return;

        const observer=new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const el=entry.target;

                const target=parseInt(el.dataset.count);

                let value=0;

                const speed=Math.max(10,target/80);

                const timer=setInterval(()=>{

                    value+=speed;

                    if(value>=target){

                        value=target;

                        clearInterval(timer);

                    }

                    el.innerText=Math.floor(value);

                },20);

                observer.unobserve(el);

            });

        });

        counters.forEach(item=>observer.observe(item));

    },

    /*======================================
        LIVE CLOCK
    ======================================*/

    liveClock(){

        const clock=document.querySelector("#liveClock");

        if(!clock) return;

        setInterval(()=>{

            const now=new Date();

            clock.innerHTML=now.toLocaleTimeString("vi-VN");

        },1000);

    },

    /*======================================
        CARD TILT
    ======================================*/

    cardTilt(){

        if(window.innerWidth<992) return;

        document.querySelectorAll(".product-card").forEach(card=>{

            card.addEventListener("mousemove",(e)=>{

                const rect=card.getBoundingClientRect();

                const x=e.clientX-rect.left;

                const y=e.clientY-rect.top;

                const rotateX=((y/rect.height)-0.5)*-10;

                const rotateY=((x/rect.width)-0.5)*10;

                card.style.transform=`
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                `;

            });

            card.addEventListener("mouseleave",()=>{

                card.style.transform="";

            });

        });

    }

});

/*==========================================
    START UI ENGINE
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    APP.initUI();

});
/*==========================================
    NOTIFICATION ENGINE
==========================================*/

Object.assign(APP,{

    /*======================================
        INIT NOTIFICATION
    ======================================*/

    initNotification(){

        this.createNotificationContainer();

        this.showWelcomeMessage();

        this.autoStatusNotification();

    },

    /*======================================
        CREATE CONTAINER
    ======================================*/

    createNotificationContainer(){

        if(document.querySelector(".notify-container")) return;

        const container=document.createElement("div");

        container.className="notify-container";

        document.body.appendChild(container);

    },

    /*======================================
        SHOW NOTIFICATION
    ======================================*/

    notify(title,message,type="info"){

        const container=document.querySelector(".notify-container");

        if(!container) return;

        const icons={

            success:"ri-checkbox-circle-fill",

            warning:"ri-error-warning-fill",

            danger:"ri-close-circle-fill",

            info:"ri-information-fill"

        };

        const box=document.createElement("div");

        box.className=`notify ${type}`;

        box.innerHTML=`

            <i class="${icons[type] || icons.info}"></i>

            <div>

                <strong>${title}</strong>

                <p>${message}</p>

            </div>

        `;

        container.appendChild(box);

        setTimeout(()=>{

            box.classList.add("show");

        },100);

        setTimeout(()=>{

            box.classList.remove("show");

            setTimeout(()=>{

                box.remove();

            },500);

        },5000);

    },

    /*======================================
        WELCOME
    ======================================*/

    showWelcomeMessage(){

        setTimeout(()=>{

            this.notify(

                "Welcome to PONZDZ Store",

                "Premium Digital Marketplace is Online.",

                "success"

            );

        },800);

    },

    /*======================================
        RANDOM STATUS
    ======================================*/

    autoStatusNotification(){

        const status=[

            {

                title:"Download Server",

                text:"Server is running normally.",

                type:"success"

            },

            {

                title:"System Update",

                text:"Checking latest product version.",

                type:"info"

            },

            {

                title:"Payment Gateway",

                text:"QR Payment is Ready.",

                type:"success"

            },

            {

                title:"Security",

                text:"Protection Engine Active.",

                type:"success"

            }

        ];

        setInterval(()=>{

            const item=status[

                Math.floor(Math.random()*status.length)

            ];

            this.notify(

                item.title,

                item.text,

                item.type

            );

        },25000);

    }

});

/*==========================================
    START NOTIFICATION ENGINE
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    APP.initNotification();

});
/*==========================================
    DASHBOARD ENGINE
==========================================*/

Object.assign(APP,{

    /*======================================
        INIT DASHBOARD
    ======================================*/

    initDashboard(){

        this.liveStats();

        this.rotateStatus();

        this.serverClock();

    },

    /*======================================
        LIVE STATS
    ======================================*/

    liveStats(){

        const stats={

            users:132,

            downloads:824,

            orders:391,

            licenses:218

        };

        setInterval(()=>{

            stats.users+=Math.floor(Math.random()*3);

            stats.downloads+=Math.floor(Math.random()*2);

            stats.orders+=Math.random()>0.6?1:0;

            stats.licenses+=Math.random()>0.7?1:0;

            this.updateStat("#statUsers",stats.users);

            this.updateStat("#statDownloads",stats.downloads);

            this.updateStat("#statOrders",stats.orders);

            this.updateStat("#statLicenses",stats.licenses);

        },3000);

    },

    updateStat(selector,value){

        const el=document.querySelector(selector);

        if(el){

            el.textContent=value;

        }

    },

    /*======================================
        SYSTEM STATUS
    ======================================*/

    rotateStatus(){

        const status=document.querySelector("#systemStatus");

        if(!status) return;

        const list=[

            "🟢 All Systems Operational",

            "🛰 Download Server Stable",

            "🔐 License Server Online",

            "💳 Payment Gateway Active",

            "⚡ Premium Marketplace Ready"

        ];

        let index=0;

        setInterval(()=>{

            index++;

            if(index>=list.length){

                index=0;

            }

            status.innerHTML=list[index];

        },6000);

    },

    /*======================================
        SERVER CLOCK
    ======================================*/

    serverClock(){

        const el=document.querySelector("#serverTime");

        if(!el) return;

        setInterval(()=>{

            const now=new Date();

            el.innerHTML=now.toLocaleString("vi-VN");

        },1000);

    }

});

/*==========================================
    START DASHBOARD
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    APP.initDashboard();

});
/*==========================================
    UX ENGINE
==========================================*/

Object.assign(APP,{

    /*======================================
        INIT UX
    ======================================*/

    initUX(){

        this.smoothAnchor();

        this.activeMenu();

        this.copyButton();

        this.buttonRipple();

    },

    /*======================================
        SMOOTH ANCHOR
    ======================================*/

    smoothAnchor(){

        document.querySelectorAll('a[href^="#"]').forEach(link=>{

            link.addEventListener("click",function(e){

                e.preventDefault();

                const target=document.querySelector(this.getAttribute("href"));

                if(target){

                    target.scrollIntoView({

                        behavior:"smooth",

                        block:"start"

                    });

                }

            });

        });

    },

    /*======================================
        ACTIVE MENU
    ======================================*/

    activeMenu(){

        const sections=document.querySelectorAll("section");

        const navLinks=document.querySelectorAll(".navbar a");

        window.addEventListener("scroll",()=>{

            let current="";

            sections.forEach(section=>{

                const top=section.offsetTop-120;

                const height=section.offsetHeight;

                if(window.scrollY>=top){

                    current=section.getAttribute("id");

                }

            });

            navLinks.forEach(link=>{

                link.classList.remove("active");

                if(link.getAttribute("href")==="#"+current){

                    link.classList.add("active");

                }

            });

        });

    },

    /*======================================
        COPY BUTTON
    ======================================*/

    copyButton(){

        document.querySelectorAll("[data-copy]").forEach(btn=>{

            btn.addEventListener("click",()=>{

                navigator.clipboard.writeText(

                    btn.dataset.copy

                );

                if(APP.notify){

                    APP.notify(

                        "Copied",

                        "Copied to clipboard.",

                        "success"

                    );

                }

            });

        });

    },

    /*======================================
        RIPPLE EFFECT
    ======================================*/

    buttonRipple(){

        document.querySelectorAll("button,.primary-btn,.secondary-btn").forEach(btn=>{

            btn.addEventListener("click",(e)=>{

                const circle=document.createElement("span");

                circle.className="ripple";

                const rect=btn.getBoundingClientRect();

                circle.style.left=e.clientX-rect.left+"px";

                circle.style.top=e.clientY-rect.top+"px";

                btn.appendChild(circle);

                setTimeout(()=>{

                    circle.remove();

                },600);

            });

        });

    }

});

/*==========================================
    START UX ENGINE
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    APP.initUX();

});
/*==========================================
    PREMIUM ENGINE
==========================================*/

Object.assign(APP,{

    /*======================================
        INIT PREMIUM
    ======================================*/

    initPremium(){

        this.performanceOptimizer();

        this.customCursor();

        this.galaxyParticles();

        this.themeEngine();

    },

    /*======================================
        PERFORMANCE
    ======================================*/

    performanceOptimizer(){

        const mobile=
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if(mobile){

            document.body.classList.add("low-performance");

            return;

        }

        if(
            navigator.hardwareConcurrency &&
            navigator.hardwareConcurrency<=4
        ){

            document.body.classList.add("low-performance");

        }

    },

    /*======================================
        CURSOR GLOW
    ======================================*/

    customCursor(){

        if(window.innerWidth<992) return;

        const cursor=document.createElement("div");

        cursor.className="cursor-glow";

        document.body.appendChild(cursor);

        window.addEventListener("mousemove",(e)=>{

            cursor.style.left=e.clientX+"px";

            cursor.style.top=e.clientY+"px";

        });

    },

    /*======================================
        GALAXY PARTICLES
    ======================================*/

    galaxyParticles(){

        if(document.body.classList.contains("low-performance")) return;

        const hero=document.querySelector(".hero");

        if(!hero) return;

        setInterval(()=>{

            const p=document.createElement("span");

            p.className="galaxy-particle";

            p.style.left=Math.random()*100+"%";

            p.style.animationDuration=
            6+Math.random()*8+"s";

            hero.appendChild(p);

            setTimeout(()=>{

                p.remove();

            },14000);

        },350);

    },

    /*======================================
        THEME ENGINE
    ======================================*/

    themeEngine(){

        window.PONZDZTheme={

            set(theme){

                document.body.dataset.theme=theme;

            },

            current(){

                return document.body.dataset.theme || "blue";

            }

        };

    }

});

/*==========================================
    START PREMIUM
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    APP.initPremium();

});
/*==========================================
    PRODUCT ENGINE
==========================================*/

Object.assign(APP,{

    initProduct(){

        this.productDatabase();

        this.productModal();

    },

    productDatabase(){

        this.products={

            "AIM BODY V3":{

                price:"45.000₫",

                version:"3.1.2",

                status:"🟢 Operational",

                description:"Premium aiming solution with continuous updates."

            },

            "AIM DRAG V2":{

                price:"40.000₫",

                version:"2.8.5",

                status:"🟢 Operational",

                description:"Stable performance with frequent updates."

            },

            "MENU FLUORITE":{

                price:"90.000₫",

                version:"4.0.0",

                status:"🟡 Updating",

                description:"Premium package with multiple license options."

            },

            "MENU MIGUL":{

                price:"10.000₫",

                version:"1.6",

                status:"🟢 Operational",

                description:"Lite & Pro versions available."

            },

            "MENU DRIP":{

                price:"85.000₫",

                version:"2.0",

                status:"🟢 Operational",

                description:"Optimized Android package."

            },

            "PROXY DRIP":{

                price:"20.000₫",

                version:"1.5",

                status:"🟢 Operational",

                description:"Instant activation."

            },

            "PING KILLER":{

                price:"50.000₫",

                version:"1.9",

                status:"🔴 Maintenance",

                description:"Currently under maintenance."

            }

        };

    },

    productModal(){

        const modal=$("#productModal");

        if(!modal) return;

        const close=modal.querySelector(".modal-close");

        document.querySelectorAll(".product-btn").forEach(btn=>{

            btn.addEventListener("click",(e)=>{

                e.preventDefault();

                const card=btn.closest(".product-card");

                const title=card.querySelector("h3").innerText;

                const data=this.products[title];

                if(!data) return;

                $("#modalTitle").innerText=title;

                $("#modalDescription").innerText=data.description;

                $("#modalVersion").innerText=data.version;

                $("#modalPrice").innerText=data.price;

                $("#modalStatus").innerText=data.status;

                modal.classList.add("active");

            });

        });

        close.addEventListener("click",()=>{

            modal.classList.remove("active");

        });

        modal.addEventListener("click",(e)=>{

            if(e.target===modal){

                modal.classList.remove("active");

            }

        });

        document.addEventListener("keydown",(e)=>{

            if(e.key==="Escape"){

                modal.classList.remove("active");

            }

        });

    }

});

/*==========================================
    START PRODUCT
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    APP.initProduct();

});