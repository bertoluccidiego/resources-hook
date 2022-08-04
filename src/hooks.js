import { useState, useEffect } from "react";
import axios from "axios";

export function useField(type) {
  const [value, setValue] = useState("");

  function onChange(event) {
    setValue(event.target.value);
  }

  return {
    value,
    type,
    onChange,
  };
}

export function useResource(url) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios.get(url).then((result) => setValues(result.data));
  }, [url]);

  async function create(newObj) {
    const response = await axios.post(url, newObj);
    setValues(values.concat(response.data));
  }

  return [
    values,
    {
      create,
    },
  ];
}
