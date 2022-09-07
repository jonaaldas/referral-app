function TimeOfDay() {
  const timeOfDayGreeting = () => {
    const time = new Date().getHours()
    if (time < 12) {
      return <h1 className='text-3xl sm:text-3xl'>Good Morning!</h1>
    } else if (time > 12 && time <= 18) {
      return <h1 className='text-3xl sm:text-3xl'>Good Afternoon</h1>
    } else {
      return <h1 className='text-3xl sm:text-3xl'>Good Evening</h1>
    }
  }
  return timeOfDayGreeting()
}

export default TimeOfDay;