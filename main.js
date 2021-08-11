import './style.css'
import "tailwindcss/dist/tailwind.css"

import $ from "jquery";
console.log("$",$);

function populateCards(currencyData){
    $.each(currencyData, function (index, element) {
        if(index===0){
            console.log("currency-card",$(".currency-card"));
            $(".currency-card").find(".currency-title").text(element.name);
            $(".currency-card").find(".currency-symbol").text(element.symbol);
            $(".currency-card").find(".currency-rank").text(element.rank);
            $(".currency-card").find(".currency-price").text(Number(element.priceUsd).toFixed(3));
        } else{
            const currencyCardClone = $(".currency-card").first().clone();
            currencyCardClone.find(".currency-title").text(element.name);
            currencyCardClone.find(".currency-symbol").text(element.symbol);
            currencyCardClone.find(".currency-rank").text(element.rank);
            currencyCardClone.find(".currency-price").text(Number(element.priceUsd).toFixed(3));
            $(".card-container").append(currencyCardClone);
        }
    })
}

function fetchData(){
    $.ajax({url: "https://api.coincap.io/v2/assets?limit=6",success: function(result){
        const currencyData= result.data;
        populateCards(currencyData);
    },
    });
}
$(window).on("load",function(){
    $(".loading-hide").fadeOut("slow");
    fetchData();
})
