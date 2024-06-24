"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
  id: number;
  name: string;
  age: number;
  gender: string;
  schoolId: number;
};

type School = {
  id: number;
  schoolName: string;
  location: string;
  principalName: string;
};

async function getSchool() {
  const res = await fetch("http://localhost:9000/school", {
    cache: "no-store",
  });
  return res.json();
}

export default function UpdateStudent(student: Student) {
  const [id, setId] =  useState(student.id);
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [gender, setGender] = useState(student.gender);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [school, setSchool] = useState<School[] | []>([]);
  const [idScool, setIdSchool] = useState(student.schoolId);

  const router = useRouter();

  async function getSchoolList () {
    const res: School[] = await getSchool();
    setSchool(res);
    return res;
   }
 
   useEffect(()=> { 
     getSchoolList();
   }, [])

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:9000/student`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id : id,
        name : name,
        age :   age,
        gender : gender,
        schoolId : idScool
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-primary btn-sm" onClick={handleChange}>
        Edit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {student.name}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="School Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Location"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Gender</label>
              <select 
                className="select select-bordered w-full" 
                onChange={(e) => setGender(e.target.value)}>
                  <option disabled selected>Who is Gender?</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label font-bold">School</label>
              <select 
                className="select select-bordered w-full" 
                onChange={(e) => setIdSchool(Number(e.target.value))}>
                  {school.map(fbb =>
                    <option key={fbb?.id} value={fbb?.id} selected={fbb?.id === idScool}>{fbb?.schoolName}</option>
                  )};
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
