/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

    }
};

document.addEventListener("deviceready",onDeviceReady,false);    

function onDeviceReady() {
    startFresh();
}

app.initialize();


var squares = document.querySelectorAll(".square");
var tryagain = document.querySelector("#try");
var h1 = document.getElementsByTagName("h1")[0];
var stat = document.getElementById('try2');
var str = document.querySelector("#spn");
var sqrs = 6;
var target;
var easymode = false;
var s1 = document.querySelector("#easy");
var s2 = document.querySelector("#hard");
var optionals = document.querySelectorAll(".optional");
var pickedColor = document.querySelector("#pickedColor");

str.addEventListener("click", function (event) {
    if (event.target.id == "easy" && !easymode) {
        s1.classList.add("selected");
        s2.classList.remove("selected");
        easymode = !easymode;
        sqrs = 3;
        hideextras();
        startFresh();
    } else if (event.target.id == "hard" && easymode) {
        s2.classList.add("selected");
        s1.classList.remove("selected");
        easymode = !easymode;
        sqrs = 6;
        hideextras();
        startFresh();
    }

});

tryagain.addEventListener("click", function(){
    startFresh();
    tryagain.textContent = "New Colors";
});


function Won() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = squares[target].style.backgroundColor;
    }
    stat.textContent = "Correct!";
    h1.style.backgroundColor = squares[target].style.backgroundColor;
    tryagain.textContent = "Play Again?";
    h1.classList.add("default");
}

function hideextras() {
    let gtre = easymode ? "none" : "block";
    for (let i = 0; i < optionals.length; i++) {
        optionals[i].style.display = gtre;
    }
}

function startFresh() { 
    stat.textContent ="";
    h1.style.backgroundColor = "#4286f4";
    target = Math.floor(Math.random() * sqrs);  
    for (let i = 0; i < sqrs; i++) {
        squares[i].style.backgroundColor = '#' + Math.random().toString(16).substr(-6);
        squares[i].addEventListener("click", function () {
            if (this.style.backgroundColor === squares[target].style.backgroundColor) {
                Won(status);
            } else {
                stat.textContent = "Try Again!";
                this.style.backgroundColor = "#232323";
            }
        });
    }
    pickedColor.textContent = squares[target].style.backgroundColor;
}