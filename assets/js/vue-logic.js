let promiseArray = [];
let portfolioData = {};

promiseArray.push(new Promise((resolve, reject) => {
  
  $.getJSON( "assets/json/user_profile.json?"+Math.random(), function( data ) {
    portfolioData.userProfile = data;
    resolve(true);
  });
}));

promiseArray.push(new Promise((resolve, reject) => {
  $.getJSON( "assets/json/technologies.json?"+Math.random(), function( data ) {
    portfolioData.technologies = data.technologies;
    resolve(true);
  });
}));


// $.getJSON( "https://hetkansara.000webhostapp.com/rest-api/handle.php?getCount", function( data ) {
//   if(data && data.total_count) {
//     portfolioData.total_count = data.total_count;
//     var portfolioCount = createViewComponent('#portfolio-count',{
//       total_count: portfolioData.total_count
//     })
//   }
//   $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
//     for(let eachLine of data.split('\n')) {
//       let ipData = eachLine.split('=');
//       if(ipData[0] == 'ip') {
//         $.getJSON( "https://hetkansara.000webhostapp.com/rest-api/handle.php?ip="+ipData[1]+"&setCount");
//       }
//     }
//   });
// });

promiseArray.push(new Promise((resolve, reject) => {
  $.getJSON( "assets/json/timeline.json?"+Math.random(), function( data ) {
    data.timeline = data.timeline.sort((a, b) => {
      if (new Date(a.id) > new Date(b.id)) {
        return -1;
      } else if (new Date(a.id) < new Date(b.id)) {
        return 1;
      } else {
        return 0;
      }
    });
    portfolioData.timeline = data.timeline;
    resolve(true);
  });
}));


Promise.all(promiseArray).then(()=>{
   var heroArea = new Vue({
    el: '#hero-area',
    data:{
      heroTitle: portfolioData.userProfile.name,
      initial_intro: portfolioData.userProfile.initial_intro,
      resume_link: portfolioData.userProfile.resume_link,
    }
  });

  var serviceArea = createViewComponent('#service-area', {
    services: portfolioData.userProfile.services
  });

  var aboutArea = createViewComponent('#about-area', {
    user_profile: portfolioData.userProfile
  });
  
  var educationArea = createViewComponent('#education-area', {
    educations: portfolioData.userProfile.education
  });

  var experienceArea = createViewComponent('#experience-area', {
    experiences: portfolioData.userProfile.experience
  });

  var skillsArea = createViewComponent('#skills-area', {
    skills: portfolioData.technologies
  });

  var awardsArea = createViewComponent('#awards-area', {
    awards: portfolioData.timeline.filter((data)=>{
      if(data.type == "achievement") {
        return data;
      }
    })
  });

  var worksArea = createViewComponent('#works-area', {
    timeline: portfolioData.timeline,
    showModal: false,
    selectedWork: undefined
  });

  var hireMeArea = createViewComponent('#hire-me-area',{
    user_profile: portfolioData.userProfile
  })

  var testimonialArea = createViewComponent('#testimonial-area',{
    testimonials: portfolioData.userProfile.testimonials
  })

  var contactArea = createViewComponent('#contact-area',{
    user_profile: portfolioData.userProfile
  })

  var footerArea = createViewComponent('#footer-area',{
    user_profile: portfolioData.userProfile,
    total_count: portfolioData.total_count
  })

  var scripts = createViewComponent("#scripts", {
    scriptId: Math.random()
  })
  
  // register modal component
  Vue.component("work-modal", {
    template: "#modal-template"
  });

  accessMains.addRotatesFromViewJS(portfolioData.userProfile.titles);
})

function createViewComponent(element, data){
  return new Vue({
    el: element,
    data: data
  });
}
