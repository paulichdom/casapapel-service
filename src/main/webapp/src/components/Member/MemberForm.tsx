import { FormEvent, useState, useEffect } from "react";
import PageHeader from "../../ui/PageHeader";
import ErrorMessageContainer from "../../ui/ErrorMessageContainer";
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
import { formSkillsToSkills } from "../../util/SkillMapper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addNewMember } from "../../store/member/memberThunk";
import { RootState } from "../../store/store";
import {
  exceptionResponseMapper,
  filterSkillValidationErrors,
} from "../../util/ExceptionMapper";
import { clearException } from "../../store/member/memberSlice";

const statusOptions = [
  { key: "a", text: "Available", value: "AVAILABLE" },
  { key: "r", text: "Retired", value: "RETIRED" },
  { key: "e", text: "Expired", value: "EXPIRED" },
  { key: "i", text: "Incarcerated", value: "INCARCERATED" },
];

const MemberForm = () => {
  const dispatch = useAppDispatch();

  const buildSkill = (name: string, level: number = 1) => ({ name, level });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [formSkills, setFormSkills] = useState([buildSkill("")]);
  const [mainSkill, setMainSkill] = useState("");
  const [status, setStatus] = useState("");

  let { exception } = useAppSelector((state: RootState) => state.member);

  let errorMessage, errorMap, skillErrors: string[][] | undefined;

  if (!exception?.subErrors) {
    errorMessage = exception?.message;
  } else {
    errorMap = exceptionResponseMapper(exception);
  }

  if (errorMap) skillErrors = filterSkillValidationErrors(errorMap);

  const skills = formSkillsToSkills(formSkills);

  const newMember = () => ({
    name,
    sex,
    email,
    skills,
    mainSkill,
    status,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addNewMember(newMember()));
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
    setFormSkills((_skills) => {
      const copySkills = [..._skills];
      copySkills[index] = { ...copySkills[index], ...inputObj };
      return copySkills;
    });
  };

  const onAddSkill = () => {
    setFormSkills((_skills) => {
      return [..._skills, buildSkill("")];
    });
  };

  const onRemoveSkill = (index: number) => {
    setFormSkills((_skills) => {
      const newSkills = [..._skills];
      newSkills.splice(index, 1);
      return newSkills;
    });
  };

  useEffect(() => {
    return () => {
      dispatch(clearException());
    };
  }, [dispatch]);

  const subtitle = "A monster represents a potential member for a heist";

  return (
    <Segment basic>
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
            {errorMap && errorMap.name && (
              <ErrorMessageContainer message={errorMap.name} />
            )}
            {errorMessage && <ErrorMessageContainer message={errorMessage} />}
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
            {errorMap && errorMap.email && (
              <ErrorMessageContainer message={errorMap.email} />
            )}
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
        {errorMap && errorMap.sex && (
          <ErrorMessageContainer message={errorMap.sex} />
        )}
        <Divider />
        <Form.Field>
          <label>Skills</label>
        </Form.Field>
        <Transition.Group as={List} duration={650}>
          {formSkills.map((skill, index) => (
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
                    {skillErrors && skillErrors[index] && (
                      <ErrorMessageContainer message={skillErrors[index][1]} />
                    )}
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
                            type="button"
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
                            type="button"
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
            {errorMap && errorMap.mainSkill && (
              <ErrorMessageContainer message={errorMap.mainSkill} />
            )}
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
            {errorMap && errorMap.status && (
              <ErrorMessageContainer message={errorMap.status} />
            )}
          </Form.Field>
        </Form.Group>
        <Divider />
        <Button positive content="Create monster" />
      </Form>
    </Segment>
  );
};

export default MemberForm;
