//@ts-check
import { schedule } from "./scheduler"

describe("The scheduler", () => {
  it("Puts tasks in priority order", () => {
    // Arrange / Given
    const tasks = [
      { title: "Wash the laundry", priority: 1, estimateHours: 1 }, 
      { title: "Fold the laundry", priority: 3, estimateHours: 2 }, 
      { title: "Dry the laundry", priority: 2, estimateHours: 1.5 }];

    // Act / When
    const scheduledTasks = schedule(tasks);

    // Assert / Then
    expect(scheduledTasks).toEqual([
      { title: "Wash the laundry", priority: 1, estimateHours: 1 }, 
      { title: "Dry the laundry", priority: 2, estimateHours: 1.5 },
      { title: "Fold the laundry", priority: 3, estimateHours: 2 }]);
  });
  
  it("Schedules based on priority and time", () => {
      const tasks = [
          { title: "Wash the laundry", priority: 1, estimateHours: 1 },
          { title: "Fold the laundry", priority: 3, estimateHours: 2  }, 
          { title: "Dry the laundry", priority: 2, estimateHours: 1.5 }];
          
      const startFrom = new Date(2020, 6, 20, 16, 45, 0, 0);
      const scheduledTasks = schedule(tasks, startFrom);

      //  new Date(2020, 6, 20, 19, 15, 0, 0); // July 20, 2020 at 7:15PM  |  JAN = 0, FEB = 1

      expect(scheduledTasks).toEqual([
          { title: "Wash the laundry", priority: 1, estimateHours: 1, start: new Date(2020, 6, 20, 16, 45, 0, 0)},
          { title: "Dry the laundry", priority: 2, estimateHours: 1.5, start: new Date(2020, 6, 20, 17, 45, 0, 0) },
          { title: "Fold the laundry", priority: 3, estimateHours: 2, start: new Date(2020, 6, 20, 19, 15, 0, 0) } 
        ]);
  });
});
