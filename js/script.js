
"use strict";


document.addEventListener('DOMContentLoaded', () => {

    function goToLink(selectorElement) {
        const scrollTarget = document.querySelector(selectorElement);
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        window.scrollBy({
            top: elementPosition,
            behavior: "smooth",
        });
    }

    // Product Description

    function productDescriptionClickRemove(items, itemDescs) {
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            item.classList.remove('current');
        }
        for (let index = 0; index < itemDescs.length; index++) {
            const itemDesc = itemDescs[index];
            itemDesc.classList.remove('current');
        }
    }

    function productDescriptionClick() {
        const items = document.querySelectorAll('.description-area .button-area .item');
        const itemDescs = document.querySelectorAll('.description-area .body-area .item');
        if (items.length > 0) {
            for (let index = 0; index < items.length; index++) {
                const item = items[index];
                item.addEventListener('click', () => {
                    productDescriptionClickRemove(items, itemDescs);
                    item.classList.add('current');
                    itemDescs[index].classList.add('current');
                });
            }
        }
    }
    productDescriptionClick();

    //==============================================================================================================


    // Product Prise

    function productPriseClick() {
        // const counts = document.querySelector('.product .main-text-area .total-area .t-price');
        const plus = document.querySelector('.product__plus');
        const minus = document.querySelector('.product__minus');
        const numberInput = document.querySelector('.product__number');
        const cost = document.querySelector('.product .main-text-area .total-area .t-price');

        if (cost) {

            let number = 1;
            numberInput.textContent = number;

            let costNumber = Number(cost.textContent);
            let num = 0;

            plus.addEventListener('click', () => {
                number++;
                numberInput.textContent = number;

                num = costNumber + Number(cost.textContent);
                cost.textContent = num;
            });

            minus.addEventListener('click', () => {
                if (number <= 1) {
                    number = 1;
                } else {
                    number--;
                    numberInput.textContent = number;

                    num = Number(cost.textContent) - costNumber;
                    cost.textContent = num;
                }
            });
        }
    }
    productPriseClick();

    //===============================================================================================================


    // Cart Date

    function cartDate() {
        const input = document.querySelector('.totals-cart-content__content input');
        const inputSpan = document.querySelector('.totals-cart-content__content span');
        let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        if (input) {
            let todayDay = `${week[new Date().getDay()]}, ${new Date().getDate()} ${month[new Date().getMonth()]}, ${new Date().getFullYear()}`;
            inputSpan.textContent = todayDay;

            input.addEventListener('change', () => {
                const splitStr = input.value.split('-');
                const dateNow = new Date().getTime();
                let date = new Date(`${Number(splitStr[0])} ${Number(splitStr[1])} ${Number(splitStr[2])}`);
                let weekday = date.getDay();
                let todayChangeDay = `${week[weekday]}, ${splitStr[2]} ${month[Number(splitStr[1]) - 1]}, ${Number(splitStr[0])}`;

                if (date.getTime() <= new Date().getTime()) {
                    inputSpan.textContent = todayDay;
                    inputSpan.classList.add('_error');
                    document.querySelector('.totals-cart-content__btn a').classList.add('_disable');
                } else {
                    inputSpan.textContent = todayChangeDay;
                    if (inputSpan.classList.contains('_error')) {
                        inputSpan.classList.remove('_error');
                        document.querySelector('.totals-cart-content__btn a').classList.remove('_disable');
                    }
                }
                if (date.getDate() === new Date(dateNow).getDate() && date.getMonth() === new Date(dateNow).getMonth()) {
                    inputSpan.textContent = todayChangeDay;
                    if (inputSpan.classList.contains('_error')) {
                        inputSpan.classList.remove('_error');
                        document.querySelector('.totals-cart-content__btn a').classList.remove('_disable');
                    }
                }
            });
        }
    }
    cartDate();

    //========================================================================


    // Cart Tab

    function cartTabRemoveActive(tabs, contents) {
        for (let index = 0; index < tabs.length; index++) {
            const tab = tabs[index];
            tab.classList.remove('_active');
        }
        for (let index = 0; index < contents.length; index++) {
            const content = contents[index];
            content.classList.remove('_active');
        }
    }
    function cartTabClick() {
        const tabs = document.querySelectorAll('.totals-cart-content__tab');
        const contents = document.querySelectorAll('.totals-cart-content__content');
        if (tabs.length > 0) {
            tabs[0].classList.add('_active');
            contents[0].classList.add('_active');
            for (let index = 0; index < tabs.length; index++) {
                const tab = tabs[index];
                tab.addEventListener('click', () => {
                    cartTabRemoveActive(tabs, contents);
                    tab.classList.add('_active');
                    contents[index].classList.add('_active');
                });
            }
        }
    }
    cartTabClick();

    //=============================================================================


    // Cart Count Click

    function calculatePriseCart(inputG, numPrise, costInfo, costTotal) {
        let fff;
        numPrise = [];

        inputG.forEach((priseItem, i) => {
            fff = Number(priseItem.value);
            numPrise.push(fff);
        });
        const sumOfNumbers = numPrise.reduce((acc, number) => acc + number, 0);
        costInfo.textContent = sumOfNumbers + ',00';
        costTotal.textContent = sumOfNumbers + ',00';
    }

    function cartSelectChange(select, priseText, input, inputG, numPrise, costInfo, costTotal) {
        input.value = select.value * priseText;
        select.addEventListener('change', () => {
            input.value = select.value * priseText;
            calculatePriseCart(inputG, numPrise, costInfo, costTotal);
        });
    }

    function cartClickCount() {
        const items = document.querySelectorAll('.products-cart-content__item');
        const costInfo = document.querySelector('.totals-cart-content__info-cost span');
        const costTotal = document.querySelector('.totals-cart-content__total-prise span');
        const inputG = document.querySelectorAll('.products-cart-content__item input');
        let numPrise = [];

        if (items.length > 0) {
            for (let index = 0; index < items.length; index++) {
                const item = items[index];
                const number = item.querySelector('.products-cart-content__number');
                const plus = item.querySelector('.products-cart-content__plus');
                const minus = item.querySelector('.products-cart-content__minus');
                const prise = item.querySelector('.products-cart-content__cost span');
                const input = item.querySelector('.products-cart-content__item input');
                const select = item.querySelector('.products-cart-content__item select');

                let num = 1;
                let numberText = Number(number.textContent);
                let priseText = Number(prise.textContent.split(',')[0]);

                select.value = numberText;
                input.value = (priseText * numberText);
                calculatePriseCart(inputG, numPrise, costInfo, costTotal);

                if (select) {
                    cartSelectChange(select, priseText, input, inputG, numPrise, costInfo, costTotal);
                }

                minus.addEventListener('click', () => {
                    if (numberText <= 1) {
                        numberText = 1;
                        number.textContent = numberText;
                        input.value = priseText;
                    } else {
                        numberText = numberText - num;
                        number.textContent = numberText;
                        input.value = (Number(input.value) - priseText);
                        calculatePriseCart(inputG, numPrise, costInfo, costTotal);
                    }
                });
                plus.addEventListener('click', () => {
                    numberText = numberText + num;
                    number.textContent = numberText;
                    input.value = (priseText * numberText);
                    calculatePriseCart(inputG, numPrise, costInfo, costTotal);
                });
            }
        }
    }
    cartClickCount();

    //========================================================================================


    // Checkout Page Tab

    function checkoutTabHide(tabs, contents) {
        for (let index = 0; index < tabs.length; index++) {
            const tab = tabs[index];
            tab.classList.remove('_active');
        }
        for (let index = 0; index < contents.length; index++) {
            const content = contents[index];
            content.classList.remove('_active');
        }
    }

    function checkoutTabClick() {
        const tabs = document.querySelectorAll('.customer-checkout-content__tab');
        const contents = document.querySelectorAll('.customer-checkout-content__content');

        if (tabs.length > 0) {
            tabs[0].classList.add('_active');
            contents[0].classList.add('_active');
            for (let index = 0; index < tabs.length; index++) {
                const tab = tabs[index];
                tab.addEventListener('click', () => {
                    checkoutTabHide(tabs, contents);
                    tab.classList.add('_active');
                    contents[index].classList.add('_active');
                });
            }
        }
    }
    checkoutTabClick();

    //===========================================================================================


    // Questionnaire Checkout Page

    function questionnaireInputsValidate(colums, num) {
        const inputs = colums[num].querySelectorAll('._required input');
        if (inputs.length > 0) {
            colums[num].classList.remove('_next');
        } else {
            colums[num].classList.add('_next');
        }
        let err = 0;
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            const parent = input.closest('._required');

            if (input) {
                if (input.value === '') {
                    err++;
                }
                if (err === 0) {
                    colums[num].classList.add('_next');
                    if (parent.classList.contains('_error')) {
                        parent.classList.remove('_error');
                    }
                } else {
                    if (colums[num].classList.contains('_next')) {
                        colums[num].classList.remove('_next');
                    }
                    parent.classList.add('_error');
                }
            }
        }
    }

    function questionnaireColumns(colums, num, steps) {
        for (let index = 0; index < colums.length; index++) {
            const colum = colums[index];

            if (num <= colums.length - 1) {
                colum.classList.remove('_active');
                colums[num].classList.add('_active');
            }
        }
        for (let index = 0; index < steps.length; index++) {
            const step = steps[index];

            if (num <= colums.length - 1) {
                step.classList.remove('_active');
                steps[num].classList.add('_active');
            }
        }
    }
    function questionnaireForm() {
        const formQ = document.querySelector('.customer-checkout-content__form-questy');
        const colums = document.querySelectorAll('.customer-checkout-content__column');
        const btn = document.querySelector('.customer-checkout-content__btns button');
        const steps = document.querySelectorAll('.customer-checkout-content__step');
        const btnBack = document.querySelector('.customer-checkout-content__btn-back');

        let num = 0;

        if (formQ) {
            if (colums.length > 0) {
                colums[0].classList.add('_active');
                steps[0].classList.add('_active');
            }
            if (btn) {
                btn.addEventListener('click', () => {
                    if (num <= 0) {
                        num = 0;
                    }
                    questionnaireInputsValidate(colums, num);

                    if (colums[num].classList.contains('_next')) {
                        num++;
                        questionnaireColumns(colums, num, steps);
                    }
                    goToLink('.checkout-content');

                    if (num > 0) {
                        btnBack.classList.add('_active');
                    }
                });

                btnBack.addEventListener('click', () => {
                    num--;
                    if (num <= 0) {
                        num = 0;
                        btnBack.classList.remove('_active');
                    }
                    questionnaireColumns(colums, num, steps);
                    goToLink('.checkout-content');
                });

                formQ.addEventListener('submit', (e) => {
                    if (num < colums.length) {
                        e.preventDefault();
                    }
                });
            }
        }
    }
    questionnaireForm();

    //===========================================================================================

    //Checkout Page Prise

    function checkoutPagePriseCalculate() {
        const items = document.querySelectorAll('.orders-checkout-content__item');
        const costInfo = document.querySelector('.subtotal');
        const costTotal = document.querySelector('.total');
        const inputG = document.querySelectorAll('.orders-checkout-content__item input');
        const numPrise = [];
        if (items.length > 0) {
            for (let index = 0; index < items.length; index++) {
                const item = items[index];
                const prise = item.querySelector('.orders-checkout-content__item-prise span');
                const count = item.querySelector('.orders-checkout-content__item-qty span');
                const inputItem = item.querySelector('.orders-checkout-content__item input');
                const countNumber = Number(count.textContent);
                const priseNumber = Number(prise.textContent.split(',')[0]);
                let calcPrise = countNumber * priseNumber;
                inputItem.value = calcPrise;
            }
            calculatePriseCart(inputG, numPrise, costInfo, costTotal);
        }
    }
    checkoutPagePriseCalculate();

    //===========================================================================================


    //Checkout Page Count Items

    function checkoutCountItems() {
        const items = document.querySelectorAll('.orders-checkout-content__item');
        const itemValue = document.querySelector('.orders-checkout-content__count span');
        if (items.length > 0) {
            itemValue.textContent = items.length;
        }
    }
    checkoutCountItems();

    //===========================================================================================







});