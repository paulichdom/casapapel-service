import { useState, useEffect } from "react";
import PageHeader from "../ui/PageHeader";
import ErrorMessageContainer from "../ui/ErrorMessageContainer";
import {
  Form,
  Segment,
  Divider,
  Button,
  Transition,
  List,
  Popup,
  Rating,
  Icon,
} from "semantic-ui-react";

import "./HeistSkillForm.css";
import { formSkillsToSkills, skillsToFormSkills } from "../../util/SkillMapper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import {
  exceptionValidatationMapper,
  filterSkillValidationErrors,
  exceptionResponseMapper,
} from "../../util/ExceptionMapper";
import { clearException } from "../../store/heist/heistSlice";
import { ErrorMessage } from "../../types/Exception";
import { useNavigate } from "react-router";
import "react-datetime/css/react-datetime.css";
import { Skill } from "../../types/Skill";
import LoadingSpinner from "../ui/LoadingSpinner";
import { LoadingStatus } from "../../types/LoadingStatus";
import { skillIsPersisted } from "../../util/Helpers";
import {
  HeistSkillUpdateData,
  updateHeistSkills,
} from "../../store/heist/heistThunk";

interface PropTypes {
  heistSkills: Skill[];
}

const HeistSkillForm = ({ heistSkills }: PropTypes) => {
  const dispatch = useAppDispatch();

  const { id } = useAppSelector((state) => state.heist.heistDetails);
  const { loadingStatus } = useAppSelector((state) => state.heist);

  const buildSkill = (
    name: string,
    level: number = 1,
    members: number = 1
  ) => ({ name, level, members });

  const formHeistSkills = skillsToFormSkills(heistSkills);

  const initialFormSkills =
    formHeistSkills.length === 0 ? [buildSkill("")] : formHeistSkills;

  const [formSkills, setFormSkills] = useState(initialFormSkills);

  let { exception } = useAppSelector((state: RootState) => state.heist);

  let errorMessage: ErrorMessage = {
      doubleSkill: "",
      heistAlreadyStarted: "",
    },
    errorMap,
    skillErrors: string[][] | undefined;

  if (!exception?.subErrors) {
    errorMessage = exceptionResponseMapper(exception);
  } else {
    errorMap = exceptionValidatationMapper(exception);
  }

  if (errorMap) skillErrors = filterSkillValidationErrors(errorMap);

  const skills = formSkillsToSkills(formSkills);

  const updatedHeistSkills = () => ({
    skills,
  });

  const skillsUpdateData: HeistSkillUpdateData = {
    heistId: id!,
    skills: updatedHeistSkills(),
  };

  let navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateHeistSkills(skillsUpdateData)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        navigate(-1);
      }
    });
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

  const onIncreaseMemberCount = (index: number) => {
    setFormSkills((_skills) => {
      const copySkills = [..._skills];
      const members = copySkills[index].members! + 1;
      copySkills[index] = { ...copySkills[index], members };
      return copySkills;
    });
  };

  const onDecreaseMemberCount = (index: number) => {
    setFormSkills((_skills) => {
      const copySkills = [..._skills];
      const members = copySkills[index].members! - 1;
      copySkills[index] = { ...copySkills[index], members };
      return copySkills;
    });
  };

  useEffect(() => {
    return () => {
      dispatch(clearException());
    };
  }, [dispatch]);

  const subtitle = "Update required monster number or add a new skill";

  if (loadingStatus === LoadingStatus.Loading) return <LoadingSpinner />;

  return (
    <Segment basic>
      <PageHeader
        title="Edit heist skills"
        showButton={false}
        subtitle={subtitle}
      />
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Skills</label>
        </Form.Field>
        {errorMessage && errorMessage.doubleSkill && (
          <ErrorMessageContainer message={errorMessage.doubleSkill} />
        )}
        {errorMessage && errorMessage.heistAlreadyStarted && (
          <ErrorMessageContainer message={errorMessage.heistAlreadyStarted} />
        )}
        <Transition.Group as={List} duration={650}>
          {formSkills.map((skill, index) => (
            <List.Item key={index}>
              <List.Content verticalAlign="middle">
                <Form.Group widths="three">
                  <Form.Field width="8">
                    <label>Name</label>
                    <input
                      readOnly={
                        skillIsPersisted(heistSkills, skill.name) &&
                        index <= heistSkills.length - 1
                      }
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
                  <Form.Field width={2} className="monsterCount">
                    <label>Monsters:</label>
                    <Button.Group size="small" compact>
                      <Button
                        type="button"
                        icon
                        onClick={() => {
                          onIncreaseMemberCount(index);
                        }}
                        disabled={skill.members! > 98}
                      >
                        <Icon name="caret up" />
                      </Button>
                      <Button type="button" disabled className="number">
                        {skill.members}
                      </Button>
                      <Button
                        type="button"
                        icon
                        onClick={() => onDecreaseMemberCount(index)}
                        disabled={skill.members! < 2}
                      >
                        <Icon name="caret down" />
                      </Button>
                    </Button.Group>
                  </Form.Field>
                  <Form.Field width="4" className="level">
                    <label>Level: {skill.level}</label>
                    <input
                      disabled={
                        skillIsPersisted(heistSkills, skill.name) &&
                        index <= heistSkills.length - 1
                      }
                      type="range"
                      min={1}
                      max={10}
                      value={skill.level}
                      onChange={(event) => {
                        onChangeSkill(index, { level: +event.target.value });
                      }}
                    />
                    <br />
                    <Rating
                      rating={skill.level}
                      maxRating={10}
                      size="mini"
                      disabled
                    />
                  </Form.Field>
                  <div>
                    {formSkills.length > 1 &&
                      !skillIsPersisted(heistSkills, skill.name) && (
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
                    {formSkills.length - 1 === index && (
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
        <Button positive content="Update skills" />
        <Button
          type="button"
          labelPosition="left"
          icon="left chevron"
          content="Back to heist details"
          color="twitter"
          onClick={() => navigate(-1)}
        />
      </Form>
    </Segment>
  );
};

export default HeistSkillForm;
