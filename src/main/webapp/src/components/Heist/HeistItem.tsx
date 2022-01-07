import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { Grid, Icon, Item, Label, List } from "semantic-ui-react";
import { Heist } from "../../types/Heist";
import LinePlaceholder from "../ui/LinePlaceholder";
import HeistStatusItem from "./HeistStatusItem";

interface PropTypes {
  heist: Heist;
  description: String;
}

const HeistItem = ({ description, heist }: PropTypes) => {
  const { id, name, location, heistStatus } = heist;

  const image = `https://picsum.photos/seed/${heist.name}plXY/175/145`;

  const startDate = DateTime.fromISO(heist.startDate);
  const endDate = DateTime.fromISO(heist.endDate);

  return (
    <Item>
      <Item.Image src={image} />
      <Item.Content>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={11}>
              <Item.Header as={Link} to={`/heist/${id}`} content={name} />
              <Item.Meta>
                <span className="cinema">
                  <Icon name="map marker alternate" /> {location}
                </span>
              </Item.Meta>
              {!description && <LinePlaceholder />}
              <Item.Description>{description}</Item.Description>
              <Item.Extra>
                <HeistStatusItem heistStatus={heistStatus} />
              </Item.Extra>
            </Grid.Column>
            <Grid.Column width={5}>
              <List relaxed size="large">
                <List.Item>
                  <Label color="blue" horizontal>
                    Start date
                  </Label>
                  {startDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                </List.Item>
                <List.Item>
                  <Label color="red" horizontal>
                    End date
                  </Label>
                  {endDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Item.Content>
    </Item>
  );
};

export default HeistItem;
