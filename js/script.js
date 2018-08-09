/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const studentItem = $('.student-item');

//this function hide all of the items in the list except for
//the ten that will be showed based on the page number
function showPage(pageNumber, studentList){
  //hide all students on the page
  studentList.hide();
  //loop through all the students in our student list argument
  studentList.each(function(index){
    console.log($(this));
    console.log(index);
    //check if student should be on this page number then show the student
    if((pageNumber * 10) > index && (pageNumber * 10 - 10) <= index){
      $(this).show();
      console.log('aaaaaaaaaa')
    }
  })
}

//call the showPage function to start showing page 1 with the first 10 students
showPage(1, studentItem);

$('.page').append('<div class="pagination"><ul></ul></div>');

//this function create page links based on the number of the students on the list and then
//listen for a click event to show the right list of 10 students
function appendPageLinks(studentList){
  //determine how many pages for this student list
  let pageNumber = Math.ceil(studentList.length / 10);

  $('.pagination ul li').remove();
  //loop through all the pages, append the first page with the css class active, then append all the other pages
  for(let i = 1; i < pageNumber + 1; i++){
    if(i === 1){
      $('.pagination ul').append(`<li><a href="#" class="active">${i}</a></li>`)
    } else {
      $('.pagination ul').append(`<li><a href="#">${i}</a></li>`)
    }
  }
  //when a link to a page is clicked call the showPage function to display the correct students and update the page links css:
  updateCss(studentItem);
}

function updateCss(studentList){
  $('.pagination ul li').on('click', 'a', function(){
    showPage($(this).text(), studentList)
    $('.pagination ul li a').removeClass('active');
    $(this).addClass('active');
  })
}

//call appendPageLinks to initialize the pages links based on number of students in the list
appendPageLinks(studentItem);

//this function filters the elements of the student list that are shown in the page at the moment
//filtering by the css display property. then return a filtered jquery object that will
//be used to create pages of 10 student when using the search feature

// function calcPageSearch(){
//     let displayed = $('.student-item').filter(function() {
//     let element = $(this);
//     if(element.css('display') == 'none') {
//         element.remove();
//         return false;
//     }
//     return true;
//   });
//   return displayed;
// }

function calcPageSearch(){
  let count = 0;
  $('.student-item').each(function(){
    if($(this).css('display') !== 'none'){
      count++;
    }
  });
  console.log(`count: ${count}`);
  return count;
}

//add a search component to the page for the browsers that support javascript
$('.page-header').append('<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>');

//listen for the click on the search button
$('.student-search button').on('click', function(){
  //create a variable to store the text entered in the search input
  let value = $('.student-search input').val().toLowerCase();
  //filter the elements shown on the page based on text entered by the user
  let newList = $('.student-item').filter(function(){
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

//listen for text entered in the search box
$('.student-search input').on('keyup', function(){
  //let pageNumber = Math.ceil(calcPageSearch() / 10);
  //create a variable to store the text entered in the search input
  let value = $(this).val().toLowerCase();
  //filter the elements shown on the page based on text entered by the user
  $('.student-item').filter(function(){
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
  let test = $('.student-item:visible');
  console.log(test);
  //if all the text in the input is deleted show the last page the user was at
  if(!this.value){
    showPage($('.active').text(), studentItem);
  }
  let number = Math.ceil(calcPageSearch() / 10);
  console.log(`number : ${number}`);
  //showPage(number, test);
  appendPageLinks(test);
  showPage(number, test);
});
