import { DateTime } from "luxon";
import React from "react";
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
  Image,
} from "semantic-ui-react";
import { Heist } from "../../types/Heist";

import "./HeistItemDetails.css";

interface PropTypes {
  heistDetails: Heist;
}

const HeistItemDetails = ({ heistDetails }: PropTypes) => {
  const { name, location, skills, heistStatus, startDate, endDate } =
    heistDetails;

  const startTime = DateTime.fromISO(startDate);
  const endTime = DateTime.fromISO(endDate);

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
                  <Button as={Link} to="skills" floated="right" icon circular>
                    <Icon name="pencil" />
                  </Button>
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
                    {/* <Label size="large" basic >
                      Required monsters
                      <Label.Detail>{skill.members}</Label.Detail>
                    </Label> */}
                    <span>
                      <strong>Required monsters: {skill.members}</strong>
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
                  <Button as={Link} to="skills" floated="right" icon circular>
                    <Icon name="eye" />
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <List divided animated verticalAlign="middle" selection>
              <List.Item className="sortable">
                <List.Content floated="right" verticalAlign="middle">
                  <Icon
                    name="check"
                    size="large"
                    className="hideIcon"
                    color="black"
                  />
                </List.Content>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/lena.png"
                />
                <List.Content>Lena</List.Content>
              </List.Item>
              <List.Item className="sortable">
                <List.Content floated="right" verticalAlign="middle">
                  <Icon
                    name="check"
                    size="large"
                    className="hideIcon"
                    color="black"
                  />
                </List.Content>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/lindsay.png"
                />
                <List.Content>Lindsay</List.Content>
              </List.Item>
              <List.Item className="sortable">
                <List.Content floated="right" verticalAlign="middle">
                  <Icon
                    name="check"
                    size="large"
                    className="hideIcon"
                    color="black"
                  />
                </List.Content>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/mark.png"
                />
                <List.Content>Mark</List.Content>
              </List.Item>
              <List.Item className="sortable">
                <List.Content floated="right" verticalAlign="middle">
                  <Icon
                    name="check"
                    size="large"
                    className="hideIcon"
                    color="black"
                  />
                </List.Content>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/molly.png"
                />
                <List.Content>Molly</List.Content>
              </List.Item>
            </List>
            <Button positive style={{ marginTop: "15px" }}>
              <Icon name="check circle" />
              Confirm selected monsters as heist participants
            </Button>
          </Segment>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment padded style={{ borderRadius: "10px" }} textAlign="left">
            {heistStatus === "READY" && (
              <Label icon="check circle" content={heistStatus} color="green" />
            )}
            {heistStatus === "IN_PROGRESS" && (
              <Label
                icon="clock outline"
                content={heistStatus.replace("_", " ")}
                color="yellow"
              />
            )}
            {heistStatus === "PLANNING" && (
              <Label icon="cogs" content={heistStatus} />
            )}
            {heistStatus === "FINISHED" && (
              <Label icon="flag" content={heistStatus} color="blue" />
            )}
            <Header sub dividing>
              Location:
            </Header>
            <Icon name="map marker alternate" /> {location}
            <Header sub dividing>
              Participants:
            </Header>
            None yet
            <Header sub dividing>
              Outcome:
            </Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default HeistItemDetails;
