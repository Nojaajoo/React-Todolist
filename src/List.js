import React, {useState, useEffect} from 'react';

// const URL = "http://localhost/todolist/"

export default function List({URL,criteria}) {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    // const [error, setError] = useState(null);
    const [editTask, setEditTask] = useState(null);
    const [editDesc, setEditDesc] = useState("");

    useEffect(() => {
        let status = 0;
        let address = URL + "retrieve.php";

        if (criteria != null) {
            address = URL + "search.php/" + criteria;
        }

        fetch(address)
            .then(res => {
                status = parseInt(res.status);
                return res.json();
            })
            .then(
                (res) => {
                    if (status === 200) {
                        setTasks(res);
                    } else {
                        alert(res.error);
                    }
                }, (error) => {
                    alert(error);
                }
            )
    }, [criteria])

    function save(e) {
        e.preventDefault();
        let status = 0;
        fetch(URL + "add.php", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: task
          })
        })
        .then(res => {
          status = parseInt(res.status);
          return res.json();
        })
        .then(
          (res) => {
            if (status === 200) {
              setTasks(tasks => [...tasks, res]);
              setTask("");
            } else {
              alert(res.error);
            }
          }, (error) => {
            alert(error);
          }
        )
      }
      
      function remove(id) {
        let status = 0;
        fetch(URL + "delete.php", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id: id
          })
        })
        .then(res => {
          status = parseInt(res.status);
          return res.json();
        })
        .then(
          (res) => {
            if (status === 200) {
              const newListWithoutRemoved = tasks.filter((item) => item.id !== id);
              setTasks(newListWithoutRemoved);
            } else {
              alert(res.error);
            }
          }, (error) => {
            alert(error);
          }
        )
      }
      
      function setEditedTask(task) {
        setEditTask(task);
        setEditDesc(task?.description);
      }
      
      function update(e) {
        e.preventDefault();                       //prevent form submission.
        let status = 0;                           //define a variable for http status (response from server)
        fetch(URL + "update.php", {               //Send HTTP post to server and send new task description
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({                  //Pass parameter for POST request here
            id: editTask.id,
            description: editDesc
          })
        })
        .then(res => {
          status = parseInt(res.status);
          return res.json();
        })
        .then(
          (res) => {
            if (status === 200) {
              tasks[(tasks.findIndex(task => task.id === editTask.id))].description = editDesc;
              setTasks([...tasks]);
      
              // Set edit to null, which will close form
              setEditTask(null);
              setEditDesc("");
            } else { // If status code is not ok, there is an error, display error message defined in server
              alert(res.error);
            }
          }, (error) => { // catch nerwork errors.
            alert(error);
          }
        )
      }
      
        return (
          <>
          <div className="container">
            <h3>ToDo List</h3>
            <div>
              <form onSubmit={save} >
                <label htmlFor="">New Task</label>
                <input value={task} onChange={e => setTask(e.target.value)} />
                <button>Save</button>
              </form>
            </div>
            <ol>
              {tasks.map(task => (
                <li key={task.id} >
                  {editTask?.id !== task.id &&
                  task.description
                  }
                  {editTask?.id === task.id &&
                    <form onSubmit={update} >
                      <input value={editDesc} onChange={e => setEditDesc(e.target.value)} />
                      <button>Save</button>
                      <button type="button" onClick={() => setEditedTask(null)} >Cancel</button>
                    </form>
                  }
                  <a className="delete" onClick={() => remove(task.id)} href="#" >
                    Delete
                  </a>&nbsp;
                  {editTask === null &&
                    <a className="edit" onClick={() => setEditedTask(task)} href="#">
                      Edit
                    </a>
                  }
                </li>
              ))}
            </ol>
          </div>
          </>
        );
}
