import { Fragment, FormEvent, useState } from "react";
import PageHeader from "../../ui/PageHeader";
// import ErrorMessageContainer from "../../ui/ErrorMessageContainer";
import {
  Form,
  Segment,
  Radio,
  CheckboxProps,
  Divider,
  Button,
  Transition,
  List,
  Popup,
  Rating,
} from "semantic-ui-react";

import "./MemberForm.css";
import { formSkillsToSkillDTOs } from "../../util/SkillMapper";

const statusOptions = [
  { key: "a", text: "Available", value: "AVAILABLE" },
  { key: "r", text: "Retired", value: "RETIRED" },
  { key: "e", text: "Expired", value: "EXPIRED" },
  { key: "i", text: "Incarcerated", value: "INCARCERATED" },
];

const MemberForm = () => {
  const buildSkill = (name: string, level: number = 1) => ({ name, level });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [skills, setSkills] = useState([buildSkill("")]);
  const [mainSkill, setMainSkill] = useState("");
  const [status, setStatus] = useState("");

  const mappedSkills = formSkillsToSkillDTOs(skills);

  const newMember = () => ({
    name,
    sex,
    email,
    mappedSkills,
    mainSkill,
    status,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(newMember());
  };

  const handleSexSelection: (
    event: FormEvent<HTMLInputElement>,
    value: CheckboxProps
  ) => void = (event, { value }) => {
    if (value) setSex(value.toString());
  };

  const onChangeSkill = (
    index: number,
    inputObj: { name: string } | { level: number }
  ) => {
    setSkills((_skills) => {
      const copySkills = [..._skills];
      copySkills[index] = { ...copySkills[index], ...inputObj };
      return copySkills;
    });
  };

  const onAddSkill = () => {
    setSkills((_skills) => {
      return [..._skills, buildSkill("")];
    });
  };

  const onRemoveSkill = (index: number) => {
    setSkills((_skills) => {
      const newSkills = [..._skills];
      newSkills.splice(index, 1);
      return newSkills;
    });
  };

  const subtitle = "A monster represents a potential member for a heist";

  return (
    <Fragment>
      <Segment padded="very" basic>
        <PageHeader
          title="Create a new monster"
          showButton={false}
          subtitle={subtitle}
        />
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field width="5">
              <label>Monster name</label>
              <input
                placeholder="Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              {/* <ErrorMessageContainer message="Error message" /> */}
            </Form.Field>
            <Form.Field width="5">
              <label>Email</label>
              <input
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              {/* <ErrorMessageContainer message="Error message" /> */}
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Select monster sex{sex && `: ${sex}`}</label>
          </Form.Field>
          <Form.Field>
            <Radio
              label="Male"
              name="radioGroup"
              value="M"
              checked={sex === "M"}
              onChange={handleSexSelection}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Female"
              name="radioGroup"
              value="F"
              checked={sex === "F"}
              onChange={handleSexSelection}
            />
          </Form.Field>
          {/* <ErrorMessageContainer message="Error message" /> */}
          <Divider />
          <Form.Field>
            <label>Skills</label>
          </Form.Field>
          <Transition.Group as={List} duration={650}>
            {skills.map((skill, index) => (
              <List.Item key={index}>
                <List.Content verticalAlign="middle">
                  <Form.Group widths="three">
                    <Form.Field width="8">
                      <label>Name</label>
                      <input
                        placeholder="Skill name"
                        value={skill.name}
                        onChange={(event) => {
                          onChangeSkill(index, { name: event.target.value });
                        }}
                      />
                      {/* <ErrorMessageContainer message="Error message" /> */}
                    </Form.Field>
                    <Form.Field width="4" className="level">
                      <label>Level: {skill.level}</label>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={skill.level}
                        onChange={(event) => {
                          onChangeSkill(index, { level: +event.target.value });
                        }}
                      />
                      <br />
                      <Rating rating={skill.level} maxRating={10} size="mini" />
                      {/* <ErrorMessageContainer message="Error message" /> */}
                    </Form.Field>
                    <div>
                      {skills.length > 1 && (
                        <Popup
                          inverted
                          content={"Remove skill"}
                          position="top center"
                          size="small"
                          trigger={
                            <Button
                              compact
                              basic
                              icon="remove"
                              circular
                              size="tiny"
                              className="remove"
                              onClick={() => onRemoveSkill(index)}
                            />
                          }
                        />
                      )}
                      {skills.length - 1 === index && (
                        <Popup
                          inverted
                          content={"Add new skill"}
                          position="top center"
                          size="small"
                          trigger={
                            <Button
                              compact
                              circular
                              size="tiny"
                              basic
                              icon="plus"
                              className="add"
                              onClick={onAddSkill}
                            />
                          }
                        />
                      )}
                    </div>
                  </Form.Group>
                </List.Content>
              </List.Item>
            ))}
            <Divider />
          </Transition.Group>
          <Form.Group widths="two">
            <Form.Field width="8">
              <label>Main Skill</label>
              <input
                placeholder="Main skill"
                value={mainSkill}
                onChange={(event) => {
                  setMainSkill(event.target.value);
                }}
              />
              {/* <ErrorMessageContainer message="Error message" /> */}
            </Form.Field>
            <Form.Field width="5">
              <Form.Select
                label="Status"
                options={statusOptions}
                placeholder="Status"
                value={status}
                onChange={(event, { value }) => {
                  if (value) setStatus(value.toString());
                }}
              />
              {/* <ErrorMessageContainer message="Error message" /> */}
            </Form.Field>
          </Form.Group>
          <Divider />
          <Button positive content="Create monster" />
        </Form>
      </Segment>
    </Fragment>
  );
};

export default MemberForm;
