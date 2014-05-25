(function () {

    fibonacci = function (num) {
	    if (num == 0) {
		    return 0;
	    } else if (num == 1) {
	  	    return 1;
	    }
	    return fibonacci(num-1) + fibonacci(num-2);
    }

    var container = document.getElementById('container');
    container.innerHTML = '<p>The 8th Fibonacci number is ' + fibonacci(8) + '!</p>';

}());