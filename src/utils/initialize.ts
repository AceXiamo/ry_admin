let taskArr: Function[] = []

export const commit = (task: Function) => {
  taskArr.push(task)
}

export const run = () => {
  taskArr.forEach(task => {
    task()
    taskArr.shift()
  })
}
