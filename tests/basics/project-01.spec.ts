import { test, expect } from "@playwright/test";

test.describe("project01", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.techglobal-training.com/frontend/todo-list");
    });
    test("Test Case 01 - Todo-App Modal Verification", async ({ page }) => {
        await test.step("2.Confirm that the todo-app modal is visible with the title “My Tasks.”", async () => {

            const header = page.locator('[class ^="panel-heading"]')
            await expect(header).toBeVisible();
            await expect(header).toHaveText('My Tasks');
        });
        await test.step("3.Validate that the New todo input field is enabled for text entry.", async () => {

            const newToDo = page.locator('#input-add');
            await expect(newToDo).toBeEnabled();
        });
        await test.step("4.Validate ADD button is enabled.", async () => {

            const addBtn = page.locator('#add-btn');
            await expect(addBtn).toBeEnabled();
        });
        await test.step("5.Validate Search field is enabled.", async () => {

            const searchField = page.locator('#search');
            await expect(searchField).toBeEnabled();
        });
        await test.step("6.Validate that the task list is empty, displaying the message “No tasks found!”", async () => {

            const tasksMessage = page.locator('[class $="text-danger"]');
            await expect(tasksMessage).toBeVisible();
            await expect(tasksMessage).toHaveText('No tasks found!');
        });
    });
    test("Test Case 02 - Single Task Addition and Removal", async ({ page }) => {

        await test.step("2.Enter a new task in the todo input field and add it to the list.", async () => {
            const newTask = page.locator('#input-add');
            const addBtn = page.locator('#add-btn');
            await newTask.fill('New Task');
            await addBtn.click();
        });

        await test.step("3.Validate that the new task appears in the task list.", async () => {
            const taskList = page.locator('[class$="hover__6uEQG"]');
            const newTaskText = "New Task";
            await expect(taskList).toContainText(newTaskText);
        });

        await test.step("4.Validate that the number of tasks in the list is exactly one.", async () => {
            const taskListItems = page.locator('#panel > div');
            const taskCount = await taskListItems.count();

            expect(taskCount).toBe(1);
        });

        await test.step("5.Mark the task as completed by clicking on it.", async () => {
            const newTask = page.locator('[class$="is-align-items-center"]');
            await newTask.click();
        });

        await test.step("6.Validate item is marked as completed.", async () => {

        });

        await test.step("7.Click on the button to remove the item you have added.", async () => {
            const removeBtn = page.locator('#clear');
            await removeBtn.click();
        });

        await test.step("8.Remove the completed task by clicking the designated removal button.", async () => {

        });

        await test.step("9.Validate that the task list is empty, displaying the message “No tasks found!”.", async () => {
            const emptyMessage = page.locator('[class $="text-danger"]');
            await expect(emptyMessage).toHaveText('No tasks found!')
        });
    });

    test("Test Case 03 - Multiple Task Operations", async ({ page }) => {

        await test.step("2.Enter and add 5 to-do items individually.", async () => {
            const newTasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
            const newTaskToDo = page.locator('#input-add');
            const addBtn = page.locator('#add-btn');

            for (const task of newTasks) {
                await newTaskToDo.fill(task)
                await addBtn.click()
            }

        });

        await test.step("3.Validate that all added items match the items displayed on the list.", async () => {
            const allTasks = page.locator('#panel > div');
            const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
            for (let i = 0; i < tasks.length; i++) {
                const taskText = await allTasks.nth(i).textContent();
                expect(taskText).toBe(tasks[i]);
            };
        });

        await test.step("4.Mark all the tasks as completed by clicking on them.", async () => {
            const allTasks = page.locator('[class$="center"]');
            const taskCount = await allTasks.count();

            for (let i = 0; i < taskCount; i++) {
                await allTasks.nth(i).click();
            }
        });

        await test.step("5.Click on the “Remove completed tasks!” button to clear them.", async () => {
            const removeCompletedTasks = page.locator('#clear');
            await removeCompletedTasks.click();
        });

        await test.step("6.Validate that the task list is empty, displaying the message “No tasks found!”.", async () => {
            const emptyMessage = page.locator('[class $="text-danger"]');
            await expect(emptyMessage).toBeVisible();
            await expect(emptyMessage).toHaveText('No tasks found!');
        });
    });

    test("Test Case 04 - Search and Filter Functionality in todo App", async ({ page }) => {

        await test.step("2.Enter and add 5 to-do items individually.", async () => {
            const newTasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
            const newTaskToDo = page.locator('#input-add');
            const addBtn = page.locator('#add-btn');

            for (const task of newTasks) {
                await newTaskToDo.fill(task)
                await addBtn.click()
            }

        });

        await test.step("3.Validate that all added items match the items displayed on the list.", async () => {
            const allTasks = page.locator('#panel > div');
            const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];

            for (let i = 0; i < tasks.length; i++) {
                const taskText = await allTasks.nth(i).textContent();
                expect(taskText).toBe(tasks[i]);
            };
        });

        await test.step("4.Enter the complete name of the previously added to-do item into the search bar.", async () => {
            const searchBar = page.locator('#search');
            await searchBar.fill('Task 3');
        });

        await test.step("5-6.Validate that the list is now filtered to show only the item you searched for and is exactly one.", async () => {
            const filteredTasks = page.locator('#panel > div');
            const visibleTaskCount = await filteredTasks.count();
            expect(visibleTaskCount).toBe(1);

            const visibleTaskText = await filteredTasks.first().textContent();
            expect(visibleTaskText).toBe('Task 3');
        });
    });

    test("Test Case 05 - Task Validation and Error Handling", async ({ page }) => {

        await test.step("2.Attempt to add an empty task to the to-do list.", async () => {
            const addBtn = page.locator('#add-btn');
            await addBtn.click();
        });

        await test.step("3.Validate that the task list is empty, displaying the message “No task found!”.", async () => {
            const tasksMessage = page.locator('[class $="text-danger"]');
            await expect(tasksMessage).toBeVisible();
            await expect(tasksMessage).toHaveText('No tasks found!');
        });

        await test.step("4.Enter an item name exceeding 30 characters into the list.", async () => {
            const newTaskToDo = page.locator('#input-add');
            const addBtn = page.locator('#add-btn');
            const longTaskName = 'A'.repeat(31);
            await newTaskToDo.fill(longTaskName);
            await addBtn.click();
        });

        await test.step("5.Validate error message appears and says “Error: Todo cannot be more than 30 characters!”.", async () => {
            const errorMessage = page.locator('[class$="is-danger"]');
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveText('Error: Todo cannot be more than 30 characters!');
        });

        await test.step("6.Add a valid item name to the list.", async () => {
            const newTodo = page.locator('#input-add');
            const addBtn = page.locator('#add-btn');
            const newItem = 'Task01';
            await newTodo.fill(newItem);
            await addBtn.click();
        });

        await test.step("7.Validate that the active task count is exactly one.", async () => {
            const taskListItems = page.locator('#panel > div');
            const taskCount = await taskListItems.count();
            expect(taskCount).toBe(1);
        });

        await test.step("8.Try to enter an item with the same name already present on the list.", async () => {
            const newTodo = page.locator('#input-add');
            const addBtn = page.locator('#add-btn');
            const newItem = 'Task01';
            await newTodo.fill(newItem);
            await addBtn.click();
        });

        await test.step("9.Validate that an error message is displayed, indicating “Error: You already have {ITEM} in your todo list.”.", async () => {
            const errorMesg = page.locator('[class$="is-danger"]');
            await expect(errorMesg).toBeVisible();
            await expect(errorMesg).toHaveText('Error: You already have Task01 in your todo list.');
        });
    });
});