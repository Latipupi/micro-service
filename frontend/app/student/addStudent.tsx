"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function AddStudent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [school, setSchool] = useState<School[] | []>([]);
  const [idScool, setIdSchool] = useState(1);

  const router = useRouter();

  async function getSchoolList () {
   const res: School[] = await getSchool();
   setSchool(res);
   return res;
  }

  useEffect(()=> { 
    getSchoolList();
  }, [])

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);
    await fetch("http://localhost:9000/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name : name,
        age :  Number(age),
        gender : gender,
        schoolId: idScool
      }),
    });

    setIsMutating(false);

    setName("");
    setAge("");
    setGender("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Add New
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Age</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Age"
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
                    <option key={fbb?.id} value={fbb?.id}>{fbb?.schoolName}</option>
                  )};
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
