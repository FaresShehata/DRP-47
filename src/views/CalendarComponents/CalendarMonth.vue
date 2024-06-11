<template>
  <div class="calendar-month">

    <div class="calendar-month-header">
      <CalendarDateIndicator />

      <CalendarDateIndicator />
    </div>

    <CalendarWeekdays />

    <ol class="dats-grid">
      <CalendarMonthDayItem />
    </ol>
  </div>
</template