
//Class

class Budget{
    constructor(budget) {
        this.budget = budget;
        this.budgetLeft = this.budget
    }
    subtract(amount){
        return this.budgetLeft -= amount
    }
}

class HTML{
    insertBudget(amount){
        budget_total.innerHTML = JSON.parse(amount.budget);
        budget_left.innerHTML = JSON.parse(amount.budget) ;
    };
    printErrorMessage(message,classname){
        const div = document.createElement("div");
        div.innerText = message;
        div.classList.add('alert' , 'text-center' , classname);

        const primary = document.querySelector(".primary");
        primary.insertBefore(div,addExpenseform);
    };
    insertExpense(name,amount){
        const expenses = document.querySelector("#expenses ul");
        let li = document.createElement("li");
        li.className = 'list-group-item d-flex justify-content-between align-items-center'
        li.innerHTML = `
            ${name}
            <span class="badge badge-primary badge-pill ">${amount}</span>
        `
        expenses.appendChild(li);
    }
    trackBudget(amount){
        const BudgetLeft = budget.subtract(amount);
        budget_left.innerHTML = `${BudgetLeft}`;

        if((budget.budget / 4) > BudgetLeft){
            budget_left.parentElement.parentElement.classList.remove("alert-success");
            budget_left.parentElement.parentElement.classList.add("alert-danger");
        }
        else if((budget.budget / 2) > BudgetLeft){
            budget_left.parentElement.parentElement.classList.remove("alert-success");
            budget_left.parentElement.parentElement.classList.add("alert-warning");
        }



    }
}



//Variables

let user_budget ;
let budget ;
let budget_total = document.querySelector("span#total");
let budget_left = document.querySelector("#left");

const addExpenseform = document.querySelector("#add-expense")
const html = new HTML();



//EventListeners
eventlisteners()
function eventlisteners(){

    document.addEventListener("DOMContentLoaded",function (){
        user_budget = prompt("لطفا بودجه هفتگی خود را وارد کنید");

        if(user_budget === null || user_budget === '0' || user_budget === ''){
            window.location.reload();
        }
        else{
            budget = new Budget(user_budget);
            html.insertBudget(budget);
        }

    })

    addExpenseform.addEventListener("submit",function (e){
        e.preventDefault();
        //name :
        const expense = document.querySelector("#expense").value;
        //price :
        const amount = document.querySelector("#amount").value;
        if(expense === '' || amount === ''){
            html.printErrorMessage('همه موارد باید تکمیل شوند',"alert-danger");
        }
        else{
            html.insertExpense(expense,amount);
            html.trackBudget(amount);
        }

        setTimeout(()=>{
            document.querySelector(".alert-danger").remove();
        },5000)

    })
}




