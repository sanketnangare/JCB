// Initialize form on page load
function initializeForm() {
    const dateField = document.getElementById("date");
    const amountField = document.getElementById("amount");

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    dateField.value = `${year}-${month}-${day}`;
    amountField.value = 1200;

}

function calculateTotal() {
    const hours = document.getElementById("hours").value;
    const amount = document.getElementById("amount").value;
    const totalField = document.getElementById("total");
    const amountInWordsField = document.getElementById("amountInWords");

    if (hours && amount) {
        const total = hours * amount;
        totalField.value = total;

        amountInWordsField.value = convertNumberToMarathiWords(total);
    }
}

function convertNumberToMarathiWords(number) {
    if (number === 0) return "zero";

    const belowTwenty = [
        "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
        "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
        "seventeen", "eighteen", "nineteen"
    ];
    const tens = [
        "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    ];
    const thousands = ["", "thousand", "million", "billion"];

    function helper(num) {
        if (num === 0) return "";
        else if (num < 20) return belowTwenty[num] + " ";
        else if (num < 100) return tens[Math.floor(num / 10)] + " " + helper(num % 10);
        else return belowTwenty[Math.floor(num / 100)] + " hundred " + helper(num % 100);
    }

    let result = "";
    let thousandIndex = 0;

    while (number > 0) {
        if (number % 1000 !== 0) {
            result = helper(number % 1000) + thousands[thousandIndex] + " " + result;
        }
        number = Math.floor(number / 1000);
        thousandIndex++;
    }

    return result.trim();
}

// Example usage:
console.log(convertNumberToEnglishWords(123456)); // "one hundred twenty three thousand four hundred fifty six"


function shareBill() {
    const customerNumber = document.getElementById("customerNumber").value;
    const billNumber = document.querySelector(".bill-details input[placeholder='701']").value;
    const customerName = document.querySelector(".bill-details input[placeholder='नाव']").value;
    const date = document.getElementById("date").value;
    const hours = document.getElementById("hours").value;
    const amount = document.getElementById("amount").value;
    const total = document.getElementById("total").value;
    const amountInWords = document.getElementById("amountInWords").value;

    if (!customerNumber || customerNumber.length !== 10) {
        alert("Please enter a valid 10-digit WhatsApp number.");
        return;
    }

    const message = `श्रीनाथ अर्थमूव्हर्स बिल\n\nबिल क्र.: ${billNumber}\nग्राहकाचे नाव: ${customerName}\nतारीख: ${date}\nतास: ${hours}\nदर: ${amount} रुपये\nएकूण रक्कम: ${total} रुपये\nअक्षरी रक्कम: ${amountInWords}\n\nधन्यवाद!`;

    const customerWhatsAppUrl = `https://api.whatsapp.com/send?phone=91${customerNumber}&text=${encodeURIComponent(message)}`;
    const ownerNumber = "918767071101";
    const ownerWhatsAppUrl = `https://api.whatsapp.com/send?phone=${ownerNumber}&text=${encodeURIComponent(message)}`;

    // Log URLs to verify they are correctly constructed
    console.log("Opening customer WhatsApp URL:", customerWhatsAppUrl);
    console.log("Opening owner WhatsApp URL:", ownerWhatsAppUrl);

    window.open(customerWhatsAppUrl, "_blank");
    setTimeout(() => window.open(ownerWhatsAppUrl, "_blank"), 2000);
}

initializeForm();
