var score = 0;
var income = 0;
var perClick = 0.01;

const scoreDisplay = document.getElementById('score');
const perClickDisplay = document.getElementById('perClick');
const incomeDisplay = document.getElementById('income');
const clickButton = document.getElementById('clickButton');

var userdata = {};
var upgradesdata = {};

fetch('https://ki4nus1p228.github.io/upgrades_info.json')
    .then((response) => response.json())
    .then((json) => {upgradesdata = json; initUpgrades()
        fetch('https://ki4nus1p228.github.io/data.json')
            .then((response) => response.json())
            .then((json) => {userdata = json; initData()});
    }
);

document.getElementById('shop').addEventListener('click', () => {
    if (event.target.closest('.Uupgrade')) {
        let upg_theme = event.target.closest('.tab').id
        let upg_name = event.target.closest('.upgrades').id
        let upg_info = upgradesdata[upg_theme][upg_name]
        let upg_cost = upg_info.base_cost
        let upg_income = upg_info.income_boost
        if (score >= upg_cost) {
            score -= upg_cost;
            if (upg_theme == 'mouse')
                perClick += upg_income
            else
                income += upg_income
        }
    }
})

function initUpgrades(){
    Object.keys(upgradesdata).forEach(theme => {
        Object.keys(upgradesdata[theme]).forEach(upg => {
            div = document.createElement("div");
            div.className = "upgrades";
            div.id = upg;
            uinfo = document.createElement("div");
            uinfo.className = "Uinfo";
            uname = document.createElement("p");
            ucost = document.createElement("p");
            uincome = document.createElement("p");
            uname.innerText = upg;
            ucost.innerText = 'Стоимость: '+upgradesdata[theme][upg].base_cost;
            uincome.innerText = 'Скорость: '+upgradesdata[theme][upg].income_boost;
            uinfo.append(uname);
            uinfo.append(ucost);
            uinfo.append(uincome);
            div.append(uinfo);
            upg_button = document.createElement("button");
            upg_button.className = "Uupgrade";
            upg_button.innerHTML = '<img src="images/upgrade.png" alt="Upgrade" draggable="false">';
            div.append(upg_button);
            document.getElementById(theme).append(div);
        });
    });

}

function initData(){
    score = 0;
    income = 0;
    perClick = 0.01;
    score = userdata.score;
    Object.keys(userdata.upgrades.mouse).forEach(upg => {
        perClick += userdata.upgrades.mouse[upg] * upgradesdata.mouse[upg].income_boost;
    });
    updateInfo();
}

clickButton.addEventListener('click', () => {
  score += perClick;
  updateInfo();
});

function updateInfo() {
  scoreDisplay.textContent = "Счет: " + score.toFixed(2);
  perClickDisplay.textContent = "За нажатие: " + perClick.toFixed(2);
  incomeDisplay.textContent = "Доход в секунду: " + income.toFixed(2);
}

setInterval(() => {
  score += income;
  updateInfo();
}, 1000);

function openMainTab(tabName) {
    const tabs = document.querySelectorAll('.content');
    tabs.forEach(tab => {
        tab.classList.remove('selected');
    });
    document.getElementById(tabName).classList.add('selected');
}

function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const buttons = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}
document.getElementById('games').addEventListener('click', () => {score += 9999})
