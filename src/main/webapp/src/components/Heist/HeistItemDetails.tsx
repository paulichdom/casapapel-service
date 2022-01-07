import { DateTime } from "luxon";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Label,
  List,
  Message,
  Rating,
  Segment,
  Popup,
  ListItemProps,
} from "semantic-ui-react";
import { Heist } from "../../types/Heist";
import { viewEligibleMembers } from "../../store/heist/heistThunk";
import {
  clearEligibleMembers,
  clearHeistParticipants,
} from "../../store/heist/heistSlice";

import { useAppSelector } from "../../store/hooks";
import EligibleMemberItem from "./EligibleMemberItem";
import { Member } from "../../types/Member";
import HeistParticipantItem from "./HeistParticipantItem";
import HeistStatusItem from "./HeistStatusItem";

interface PropTypes {
  heistDetails: Heist;
  heistParticipants: Member[];
}

const HeistItemDetails = ({ heistDetails, heistParticipants }: PropTypes) => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const { id, name, location, skills, heistStatus, startDate, endDate } =
    heistDetails;

  const dispatch = useDispatch();

  const showEligibleMmembers = () => {
    dispatch(viewEligibleMembers(id!));
  };

  const { eligibleMembers } = useAppSelector((state) => state.heist);

  const onSelectMembers = (event: SyntheticEvent, data: ListItemProps) => {
    const selectedMember = event.currentTarget.textContent;
    if (selectedMember !== null && !selectedMembers.includes(selectedMember!)) {
      setSelectedMembers((_members) => {
        return [..._members, selectedMember];
      });
    }
  };

  const removeSelectedMember = (event: SyntheticEvent) => {
    const selectedMember = event.currentTarget.textContent;
    if (selectedMember !== null) {
      setSelectedMembers((_members) => {
        const newMembers = _members.filter(
          (memberName) => memberName !== selectedMember
        );
        return [...newMembers];
      });
    }
  };

  const eligibleMembersItemList = eligibleMembers.map((member) => (
    <EligibleMemberItem
      key={member.id}
      memberItem={member}
      clickHandler={onSelectMembers}
    />
  ));

  const startTime = DateTime.fromISO(startDate);
  const endTime = DateTime.fromISO(endDate);

  const popupStyle = {
    borderRadius: 0,
    opacity: 0.7,
    padding: "2em",
  };

  useEffect(() => {
    return () => {
      dispatch(clearEligibleMembers());
      dispatch(clearHeistParticipants());
      setSelectedMembers([]);
    };
  }, [dispatch]);

  return (
    <Grid columns="2">
      <Grid.Row>
        <Grid.Column width={11}>
          <Header
            as="h2"
            attached="top"
            content={name}
            style={{ borderRadius: "10px 10px 0px 0px", paddingLeft: "1.75em" }}
          />
          <Segment
            attached
            style={{ borderRadius: "0px 0px 10px 10px" }}
            padded="very"
          >
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <List relaxed>
                    <List.Item>
                      <Label color="blue" horizontal>
                        Start date
                      </Label>
                      {startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                    </List.Item>
                    <List.Item>
                      <Icon color="black" name="clock outline" />
                      {startTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <List relaxed>
                    <List.Item>
                      <Label color="red" horizontal>
                        End date
                      </Label>
                      {endTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                    </List.Item>
                    <List.Item>
                      <Icon color="black" name="clock outline" />
                      {endTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider style={{ marginBottom: "35px" }} />
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column verticalAlign="bottom">
                  <h2>Required skills</h2>
                </Grid.Column>
                <Grid.Column>
                  <Popup
                    trigger={
                      <Button
                        as={Link}
                        to="skills"
                        floated="right"
                        icon="pencil"
                        circular
                      />
                    }
                    content="Edit required skills"
                    style={popupStyle}
                    inverted
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <List divided relaxed>
              {skills.length === 0 && (
                <Message
                  info
                  header="Heist skill list is empty"
                  content="Click on the edit icon in the upper right corner to add new skills"
                />
              )}
              {skills.map((skill) => (
                <List.Item key={skills.indexOf(skill)}>
                  <Header as="h3" style={{ marginBottom: "10px" }}>
                    {skill.name}
                  </Header>
                  <Rating
                    rating={skill.level.length}
                    maxRating={10}
                    disabled
                    icon="star"
                    style={{ marginRight: "10px" }}
                  />{" "}
                  {`${skill.level.length}/10`}
                  <List.Content floated="right">
                    <span>
                      Required monsters: <strong>{skill.members}</strong>
                    </span>
                  </List.Content>
                </List.Item>
              ))}
            </List>
            <Divider style={{ marginBottom: "35px" }} />
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column verticalAlign="bottom">
                  <h2>Eligible monsters</h2>
                </Grid.Column>
                <Grid.Column>
                  <Popup
                    trigger={
                      <Button
                        icon="eye"
                        circular
                        floated="right"
                        onClick={showEligibleMmembers}
                      />
                    }
                    content="Show eligible monsters"
                    style={popupStyle}
                    inverted
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <List
              divided
              animated
              verticalAlign="middle"
              selection
              items={eligibleMembersItemList}
            />
            {eligibleMembers.length < 1 && (
              <Message
                info
                content="Click the 'eye' button to view eligible monsters"
                style={{ marginTop: "35px" }}
              />
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment padded style={{ borderRadius: "10px" }} textAlign="left">
            <Header sub dividing style={{ marginBottom: "10px" }}>
              Status:
            </Header>
            <HeistStatusItem heistStatus={heistStatus} />
            <Header sub dividing>
              Location:
            </Header>
            <Icon name="map marker alternate" /> {location}
            <Header sub dividing>
              Participants:
            </Header>
            {heistParticipants.length < 1 && "List is empty"}
            <List relaxed verticalAlign="middle" size="huge">
              {heistParticipants.length > 0 &&
                heistParticipants.map((participant) => (
                  <HeistParticipantItem
                    key={participant.id}
                    participant={participant}
                  />
                ))}
            </List>
            {!heistParticipants && <Icon loading name="spinner" />}
            <Header sub dividing>
              Outcome:
            </Header>
            <Button
              size="mini"
              basic
              circular
              icon="eye"
              style={{ marginTop: "10px" }}
            />
          </Segment>
          {selectedMembers.length > 0 && (
            <Segment padded style={{ borderRadius: "10px" }} textAlign="left">
              <Header sub dividing>
                Selected monsters: {selectedMembers.length}
              </Header>
              <List relaxed>
                {selectedMembers.map((memberName, index) => (
                  <List.Item key={index} onClick={removeSelectedMember}>
                    <Label basic color="green">
                      <Icon name="check circle" />
                      {memberName}
                      <Icon name="delete" />
                    </Label>
                  </List.Item>
                ))}
              </List>
              <Button
                color="blue"
                style={{ marginTop: "15px" }}
                fluid
                size="tiny"
                content="Confirm participants"
              />
            </Segment>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default HeistItemDetails;
