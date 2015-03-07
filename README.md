Awesomplete
=====================

This is a package wrapper for [Lea Verou's awesomplete library](http://leaverou.github.io/awesomplete/).

## IMPORTANT TO KNOW

The follwing does NOT work :

<input class="awesomplete" data-list="Ada, Java, JavaScript, Brainfuck, LOLCODE, Node.js, Ruby on Rails" />

You need to use Aweseome's API.


#in your hello.html file

<template name='Hello'>
    <input id="myinput" />
</template>

#in your js file

Template.Hello.rendered = function(){
    var input = document.getElementById("myinput");
    new Awesomplete(input, {
    	list: ["Ada", "Java", "JavaScript", "Brainfuck", "LOLCODE", "Node.js", "Ruby on Rails"]
    });
};

