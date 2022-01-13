
$(document).ready(() => {
    //here i declared some basic variables 
    const input = $("#text");
    const color = $(".colour");
    const colours = ["#ed4340", "#f48c8a", "#f8ae4f", "#f84fde", "#10b199", "#32a881", "#9932a8"];
    const button = $(".submit")
    const list = $("ul");
    let arrayTask = [];
    let completeArray = [];
    let editableArray = [];
    //creating new tasks with random colors
    const render = () => {
        list.empty();
        arrayTask.forEach(item => {
            console.log(item.color , 'fdfdfdfdfd')
            const checked = item.checked ? 'checked' : '' 
            const newTask = ("<li class = 'item' id = " + item.id + " style = background-color:" + item.color + "><div class = 'container'> <input  id = " + item.id + " type = 'checkbox' class = 'check' "+checked+"> <p id = " + item.id + " class = 'text'>" + input.val() + "</p> </div></li>");
            list.append(newTask)
        })
    }

    button.on("click", () => {
        const color = colours[Math.floor(Math.random() * colours.length)];
        const new_todo = {
            checked: false,
            id: Date.now(),
            text: input.val(),
            color: color,
        }
        arrayTask.push(new_todo)
        render();
    });

    $(document).on(`click`, `.text`, function (e) {
        let idOftext = e.target.id
        document.getElementById(idOftext).addEventListener("click", () => {
            document.getElementById(idOftext).setAttribute('contenteditable', true)
            const txt = document.getElementById(idOftext).value
            arrayTask.forEach(item => item.text = txt)
        })
    })


    $(window).keydown(function (event) {
        let keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13) {
            $("p").attr('contenteditable', false)
        }
    });
    //this code lets user when to chenge color when checkbox is checked 
    $(document).on(`change`, `.check`, function () {
        const changeCheck = parseInt($(this).parent().parent()
            .attr(`id`));
        arrayTask.forEach(item => {
            if (changeCheck === item.id) {
                item.checked = !item.checked;
            }
        });
        // countTrue();
        // render();
    });


    // const countTrue = () => {
    //     completeArray = arrayTask.filter(item => item.checked);
    // }
    color.on("click", function (e) {
        const col = $(this).attr(`id`);
        arrayTask.forEach(item => {
            if (item.checked) {
                item.color = col;
                console.log(item.color)
                console.log(arrayTask)
                // const liId = document.getElementById(item.id);
                // liId.style.backgroundColor = col;
            }
        })
        render()
    })
});