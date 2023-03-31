const today = new Date();

const eventsDaily = [
    [['Early Bird Skate','8:30am To 12:00pm'],['Free Skate','1:30pm To 5pm'],['Soul Sunday','6:30pm To 11:00pm']],
    [['Free Skate','8:30am To 12:00pm'],['Doubles Skate','1:30pm To 5pm'], ['Glow Skate','6:30pm To 10pm']],
    [['Photon Practice','8:30am To 12:00pm'],['Free Skate','1:30pm To 5pm'], ['Adult Night','6:30pm To 10pm']],
    [['Early Bird Skate','8:30am To 12:00pm'],['School Skate','1:30pm To 5pm'], ['Nostalgia Night','6:30pm To 10pm']],
    [['Photon Practice','8:30am To 12:00pm'],['Free Skate','1:30pm To 5pm'], ['Adult Night','6:30pm To 10pm']],
    [['Free Skate','8:30am To 12:00pm'],['Doubles Skate','1:30pm To 5pm'],['Funky Friday','6:30pm To 11:00pm']],
    [['Early Bird Skate','8:30am To 12:00pm'],['Free Skate','1:30pm To 5pm'],['Starry Saturday','6:30pm To 11:00pm']]
]

document.querySelector('.Calendar .Day').textContent = today.toLocaleString('en-us', {weekday:'long'})
document.querySelectorAll('.Calendar .Time div p').forEach((time, element) => {time.textContent = eventsDaily[today.getDay()][element][0]})
document.querySelectorAll('.Calendar .Time div button span').forEach((time, element) => {time.textContent = eventsDaily[today.getDay()][element][1]})

const modal = document.getElementById("myModal");
const btns = document.querySelectorAll("#modalBtn");
const  span = document.getElementsByClassName("close")[0];

btns.forEach(btn => btn.addEventListener('click', () => modal.style.display = "block"))

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
