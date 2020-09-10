//@ts-check

function addHours(date, hours) {
  date.setTime(date.getTime() + (hours*60*60*1000));
  return date;
}

export function schedule(tasks, startFrom = new Date()) {
    tasks.sort((a, b) => a.priority - b.priority);
    

    for (const task of tasks) {
        if(!task.start){
          // There is no task.start (task.start is falsy)
          task.start = startFrom;
        }
        task.start = addHours(task.start, task.priority);
        
        // TODO: Each task START must be the previous task's start PLUS the previous task's estimate
    }
    
    return tasks;
}
