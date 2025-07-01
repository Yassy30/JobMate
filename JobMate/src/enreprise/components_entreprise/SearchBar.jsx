import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import JobAlert from "../content/PostJob";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useState({ title: "", location: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const location = e.target.location.value.trim();
    setSearchParams({ title, location });
  };

  return (
    <div>
      {/* Search Form */}
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
          <InputGroup className="mb-3">
            {/* Job Title Input */}
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Job title, Keyword..."
              aria-label="Job title, Keyword"
              name="title"
            />

            {/* Location Input */}
            <InputGroup.Text>
              <i className="bi bi-geo-alt"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Your Location"
              aria-label="Your Location"
              name="location"
            />

            {/* Find Job Button */}
            <Button variant="primary" type="submit">
              Find Job
            </Button>
          </InputGroup>
        </form>
      </div>

      {/* Job Results */}
      <JobAlert title={searchParams.title} location={searchParams.location} />
    </div>
  );
}
