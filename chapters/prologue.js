const pages = document.querySelectorAll(".page");
const nextButton = document.getElementById("next-page");

let currentPage = 0;

function showPage(index){

    pages.forEach((page)=>{

        page.classList.remove("active");

    });

    pages[index].classList.add("active");

    if(index === pages.length - 1){

        nextButton.textContent = "Close Book";

    }else{

        nextButton.textContent = "Next Page →";

    }

}

nextButton.addEventListener("click",()=>{

    if(currentPage < pages.length - 1){

        currentPage++;

        showPage(currentPage);

    }else{

        const viewer = window.parent.document.getElementById("book-viewer");

        if(viewer){

            viewer.classList.remove("opening");

            setTimeout(()=>{

                viewer.style.display = "none";

            },700);

        }

    }

});

showPage(currentPage);