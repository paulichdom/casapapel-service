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
} from "semantic-ui-react";

import "./MemberForm.css";
import { formSkillsToSkills, skillsToFormSkills } from "../../util/SkillMapper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import {
  exceptionValidatationMapper,
  filterSkillValidationErrors,
  exceptionResponseMapper,
} from "../../util/ExceptionMapper";
import {
  clearException,
} from "../../store/member/memberSlice";
import { ErrorMessage } from "../../types/Exception";
import { MemberSkills } from "../../types/Skill";
import { skillIsPersisted } from "../../util/Helpers";
import ConfirmationPortal from "../ui/ConfirmationPortal";
import {
  deleteMemberSkill,
  MemberSkillToDelete,
  viewMemberSkills,
  updateMemberSkills,
  SkillUpdateData,
} from "../../store/member/memberThunk";
import { useNavigate } from "react-router-dom";
import { LoadingStatus } from "../../types/LoadingStatus";
import LoadingSpinner from "../ui/LoadingSpinner";

interface PropTypes {
  memberSkills: MemberSkills;
}

const MemberForm = (props: PropTypes) => {
  const dispatch = useAppDispatch();

  const { id } = useAppSelector((state) => state.member.memberDetails);
  const { loadingStatus } = useAppSelector((state) => state.member);

  const { memberSkills } = props;

  const formMemberSkills = skillsToFormSkills(memberSkills.skills);

  const buildSkill = (name: string, level: number = 1) => ({ name, level });
  const buildSkillToRemove = (name: string, index: number | null = null) => ({
    index,
    name,
  });
  const buildSkillToDelete = (
    skillName: string,
    memberId: number = id!
  ): MemberSkillToDelete => ({ memberId, skillName });

  const initialFormSkills =
    formMemberSkills.length === 0 ? [buildSkill("")] : formMemberSkills;
  const isLastSkillPersisted = formMemberSkills.length === 0 ? false : true;
  const mainSkillValue = memberSkills.mainSkill ? memberSkills.mainSkill : "";

  const [formSkills, setFormSkills] = useState(initialFormSkills);
  const [mainSkill, setMainSkill] = useState(mainSkillValue);
  const [lastSkillIsPersisted, setLastSkillIsPersisted] =
    useState(isLastSkillPersisted);
  const [isConfirmHandlerOpen, setIsConfirmHandlerOpen] = useState(false);
  const [skillToRemove, setSkillToRemove] = useState(buildSkillToRemove(""));
  const [skillToDelete, setSkillToDelete] = useState(buildSkillToDelete(""));

  let { exception } = useAppSelector((state: RootState) => state.member);

  let errorMessage: ErrorMessage = {
      memberAlreadyExists: "",
      doubleSkill: "",
      mainSkillReference: "",
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

  const newMemberSkillsMain = () => ({
    skills,
    mainSkill,
  });

  const newMemberSkills = () => ({
    skills,
  });

  const skillsUpdateData: SkillUpdateData = {
    memberId: id!,
    skillSet: mainSkill === "" ? newMemberSkills() : newMemberSkillsMain(),
  };

  let navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateMemberSkills(skillsUpdateData)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        navigate(`/member/${id}`);
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

  const removeSkill = (index: number) => {
    setFormSkills((_skills) => {
      const newSkills = [..._skills];
      newSkills.splice(index, 1);
      return newSkills;
    });
  };

  const openConfirmHandler = () => setIsConfirmHandlerOpen(true);

  const closeConfirmHandlerWithConfirm = () => {
    console.log(skillToRemove.index);

    if (skillToRemove.index === 0 && formSkills.length === 1) {
      removeSkill(skillToRemove.index);
      onAddSkill();
      setLastSkillIsPersisted(false);
    } else {
      removeSkill(skillToRemove.index!);
    }

    setIsConfirmHandlerOpen(false);

    setTimeout(() => {
      dispatch(deleteMemberSkill(skillToDelete)).then((response) => {
        if (response.meta.requestStatus === "fulfilled")
          dispatch(viewMemberSkills(id!));
      });
    }, 1100);
  };

  const closeConfirmHandlerWithCancel = () => {
    setIsConfirmHandlerOpen(false);
  };

  const removeSkillHandler = (index: number, name: string) => {
    if (skillIsPersisted(memberSkills.skills, name)) {
      setSkillToRemove({ index: index, name: name });
      setSkillToDelete((_skill) => {
        return { memberId: _skill.memberId, skillName: name };
      });
      openConfirmHandler();
      return;
    }

    removeSkill(index);
  };

  useEffect(() => {
    return () => {
      dispatch(clearException());
    };
  }, [dispatch]);

  const subtitle =
    "Update skill level, remove existing skill or add a new skill";

  const messageDetails = `This skill is persisted. Do you want to delete the skill permanently?`;

  if (loadingStatus === LoadingStatus.Loading) return <LoadingSpinner />;

  return (
    <Segment basic>
      <PageHeader
        title="Edit monster skills"
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
        <Transition.Group as={List} duration={650}>
          {formSkills.map((skill, index) => (
            <List.Item key={index}>
              <List.Content verticalAlign="middle">
                <Form.Group widths="three">
                  <Form.Field width="8">
                    <label>Name</label>
                    <input
                      type="text"
                      /* readOnly={initialFormSkills.includes(skill)} */
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
                  </Form.Field>
                  <div>
                    {(formSkills.length > 1 || lastSkillIsPersisted) && (
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
                            onClick={() =>
                              removeSkillHandler(index, skill.name)
                            }
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
            {errorMessage && errorMessage.mainSkillReference && (
              <ErrorMessageContainer
                message={errorMessage.mainSkillReference}
              />
            )}
          </Form.Field>
        </Form.Group>
        <Divider />
        <Button positive content="Update skills" />
        <Button
          type="button"
          labelPosition="left"
          icon="left chevron"
          content="Back to monster details"
          color="twitter"
          onClick={() => navigate(-1)}
        />
        <ConfirmationPortal
          isOpen={isConfirmHandlerOpen}
          cancelHandler={closeConfirmHandlerWithCancel}
          confirmHandler={closeConfirmHandlerWithConfirm}
          messageDetails={messageDetails}
          transition={{ animation: "fly up", duration: 800 }}
        />
      </Form>
    </Segment>
  );
};

export default MemberForm;
