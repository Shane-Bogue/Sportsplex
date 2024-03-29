
function createDiv(names,content) {
    const div = document.createElement('div')
    div.classList.add(...names)
    div.textContent = content
    return div
}

class Calendar {

    static selected = new Date()
    static day = this.selected.getDate();
    static month = this.selected.getMonth()
    static year = this.selected.getFullYear()

    static months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    static eventsCustom = []

    static eventsDaily = [
        [['Early Bird Skate','8:30am - 12:00pm'],['Free Skate','1:30pm - 5pm'],['Soul Sunday','6:30pm - 11:00pm']],
        [['Free Skate','8:30am - 12:00pm'],['Doubles Skate','1:30pm - 5pm'], ['Glow Skate','6:30pm - 10pm']],
        [['Photon Practice','8:30am - 12:00pm'],['Free Skate','1:30pm - 5pm'], ['Adult Night','6:30pm - 10pm']],
        [['Early Bird Skate','8:30am - 12:00pm'],['School Skate','1:30pm - 5pm'], ['Nostalgia Night','6:30pm - 10pm']],
        [['Photon Practice','8:30am - 12:00pm'],['Free Skate','1:30pm - 5pm'], ['Adult Night','6:30pm - 10pm']],
        [['Free Skate','8:30am - 12:00pm'],['Doubles Skate','1:30pm - 5pm'],['Funky Friday','6:30pm - 11:00pm']],
        [['Early Bird Skate','8:30am - 12:00pm'],['Free Skate','1:30pm - 5pm'],['Starry Saturday','6:30pm - 11:00pm']]
    ]

    static eventDescriptions = {
        'Early Bird Skate': 'Join Us Bright And Early For Free Rentals And Half Priced Entry.',
        'Free Skate': 'General Skate Admission And Fees',
        'Doubles Skate': 'Come With A Partner And Buy One Ticket And Get The Other Half Off',
        'Photon Practice': 'Join Us For Our Practice Session (Beginner To Intermediate)',
        'School Skate': 'Half Off Entery With Valid School ID',
        'Soul Sunday': 'Sing Along To Gospel, Rhythm And Blues While We Take You Back To The 50\'s, 60\'s, And 70\'s Too!  ',
        'Glow Skate': 'Neon! Neon! Neon! Glow Sticks FREE With Entry And Wear Your Brightest Lights And Colors!',
        'Adult Night': 'Only Adults (18+). Join In On Fun Karokee, Dance Sessions, And Plenty Of Other Activites.',
        'Nostalgia Night': 'It\'s Time To Listen To The Greatest Hits From Every Generation. This Will Be A Throwback For Everyone No Matter The Age.',
        'Funky Friday': 'Get Your Funkiest Outfit On That Rink Because Tonight We All Are Having A Great Time.',
        'Starry Saturday': 'Skate Under The Stars With An Atmospheric Rink Transformation. You Won\'t Forget It.',
    }

    static selectDay(element) {
        UI.days.forEach(day => { 
        if (day.classList.contains('selected')) day.classList.remove('selected','Grit')})
        element.classList.add('selected','Grit')
        this.day = element.textContent
        this.selected = new Date(this.year,this.month,this.day)
        if (element.classList.contains('lastMonth')) { this.selected = new Date(this.year,this.month-1,this.day); this.lastMonth() }
        this.Info()
    }

    static nextMonth() {
        UI.Update()
        UI.days.forEach(day => {day.remove()})
        this.month++
        if (this.month > 11) {
            this.month = 0
            this.year++
        }
        Calendar.Generate(this.year, this.month)
    }

    static lastMonth() {
        UI.Update()
        UI.days.forEach(day => day.remove())
        this.month--
        if (this.month < 0) {
            this.month = 11
            this.year--
        }
        Calendar.Generate(this.year, this.month)
    }

    static Reset()  {
        this.selected = new Date()
        this.day =  this.selected.getDate();
        this.month = this.selected.getMonth()
        this.year = this.selected.getFullYear()
        UI.Update()
        UI.days.forEach(day => day.remove())
        this.Generate(this.year, this.month)
    }

    static Info() {
        Display.Change(Display.calendarMonth, this.months[this.month])
        Display.Change(Display.calendarDate, `${this.months[this.selected.getMonth()]} ${this.selected.getDate()}${["st","nd","rd"][((this.selected.getDate()+90)%100-10)%10-1]||"th"}`)
        Display.Change(Display.calendarYear, this.selected.getFullYear())
        Display.Change(Display.calendarEvents, '')

        this.eventsDaily[this.selected.getDay()].forEach(events => events.forEach((event, isTime) => {
            Display.Update()
            isTime? Display.calendarEvent.append(createDiv(['time'],event)): Display.calendarEvents.append(createDiv(['event'],event))
        }))

        document.querySelectorAll('.Arcade .Time div p').forEach((time, element) => {time.textContent = Calendar.eventsDaily[Calendar.selected.getDay()][element][0]})
        document.querySelectorAll('.Arcade .Time div button span').forEach((time, element) => {time.textContent = Calendar.eventsDaily[Calendar.selected.getDay()][element][1]})
        document.querySelectorAll('.Arcade .Time .desc').forEach((time, element) => {time.textContent = Calendar.eventDescriptions[Calendar.eventsDaily[Calendar.selected.getDay()][element][0]]})
    }

    static Generate(year,month) {
        
        this.Info()
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const lastDayOfLastMonth = new Date(year, month, 0).getDate();

        for (let i = 1; i < lastDayOfMonth + 1; i++) {
            const date = new Date(year, month, i)

            if (date.getDate() == 1) for (let i = date.getDay() - 1; i > -1; i--)
                Display.calendarGrid.append(createDiv(['day','interface','lastMonth'],lastDayOfLastMonth - i))
            
            Display.calendarGrid.append(createDiv(date.setHours(0,0,0,0)==this.selected.setHours(0,0,0,0)?['selected','day','interface','Grit']:['day','interface'],date.getDate()))
        }

        UI.Update()
    }

}

class UI {
    static calendarMonthRight = document.querySelector('.Schedule .right.interface')
    static calendarMonthLeft = document.querySelector('.Schedule .left.interface')
    static days = document.querySelectorAll('.Schedule .day.interface')
    static reset = document.querySelector('.Schedule .reset.interface')

    static Initialize() {
        this.calendarMonthLeft.addEventListener('click', () => Calendar.lastMonth())
        this.calendarMonthRight.addEventListener('click', () => Calendar.nextMonth())
        this.reset.addEventListener('click', () => Calendar.Reset())
    }

    static Update() {
        this.days = document.querySelectorAll('.Schedule .day.interface')
        this.days.forEach(day => day.addEventListener('click', () => Calendar.selectDay(day)))
    }
}

class Display {
    static calendarGrid = document.querySelector('.Schedule .grid')
    static calendarMonth = document.querySelector('.Schedule .month')
    static calendarInfo = document.querySelector('.Schedule .info')
    static calendarDate = document.querySelector('.Schedule .date')
    static calendarYear = document.querySelector('.Schedule .year')
    static calendarEvents = document.querySelector('.Schedule .events')
    static calendarEvent = document.querySelector('.Schedule .events .event:last-child')

    static Change(element,content) {
        element.textContent = content
    }

    static Update() {
        this.calendarEvent = document.querySelector('.Schedule .events .event:last-child')
    }
}

Calendar.Generate(Calendar.year, Calendar.month)
UI.Initialize()

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