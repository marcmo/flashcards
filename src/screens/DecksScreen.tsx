import * as React from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  ListRenderItemInfo,
  SectionListData,
  TouchableOpacity,
} from 'react-native';
import * as N from 'react-native-navigation';
import Row from '../components/Row';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import createStore from '../redux';
import * as actions from '../redux/actions';
import * as R from 'ramda';
import { RootState, Deck } from '../types';
import { RoundedButton } from '../components/RoundedButton';
import { Fonts, Colors, Metrics } from '../themes/';
import { getIcon } from '../lib/appIcons';
import { log } from '../lib/Logging';

import CodePush from 'react-native-code-push';

const CodePushLocalConfig = {
  updateDialog: CodePush.DEFAULT_UPDATE_DIALOG,
  installMode: CodePush.InstallMode.IMMEDIATE,
  deploymentKey: Platform.select({
    android: '0jZ6KTNRX6B7yx7gx-mkhTiGbMCrSJwiQxXgf',
    ios: 'not known yet...find out',
  }),
};
interface RowData {
  name: string;
  deckCount: number;
}
const dataSource = (data): SectionListData<RowData>[] => ([{ data, key: 'DECKS' }]);
interface Props {
  createDeck: () => void;
  decks: Array<Deck>;
  rowData: Array<RowData>;
  navigator: N.Navigator;
}
class DecksScreen extends React.Component<Props, any> {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  checkForUpdates = () => {
    CodePush.sync(CodePushLocalConfig);
  }

  componentWillMount() {
    this.checkForUpdates();
  }

  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      const parts = event.link.split('/');
      if (parts[0] === 'tab1') {
        this.props.navigator.push({
          screen: parts[1],
        });
      }
    }
  }

  toggleDrawer = () => {
    log.d('toggleDrawer');
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  }

  dismissLightBox = () => {
    this.props.navigator.dismissLightBox();
  }

  submit = () => {
    log.d('submit');
  }

  renderItem = (item: ListRenderItemInfo<RowData>) => {
    log.d('renderItem for DecksScreen, item:', item);
    return (
      <DeckComponent {...item.item} />
    );
  }

  showModal = () => {
    this.props.navigator.showModal({
      screen: 'flashcards.AddDeckScreen',
      title: 'Add Identity',
      navigatorButtons: {
        rightButtons: [
          {
            id: 'close',
            icon: getIcon('ios-close'),
          },
        ],
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          renderItem={this.renderItem}
          data={this.props.rowData}
          keyExtractor={(item) => item.name}
        />

        <View
          style={styles.formContainer}
          pointerEvents="box-none"
        >
          <TouchableOpacity
            onPress={() => this.showModal()}
            style={styles.addButton}
          >
            <Text
              style={styles.buttonText}
            >
              <Icon
                name="plus"
                style={styles.icon}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const DeckComponent = (item) => (
  <View style={styles.deck}>
    <Text style={styles.text}>
      {item.name}
    </Text>
    <Text style={styles.text}>
      {item.deckCount}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#efefef',
  },
  deck: {
    flex: 1,
    backgroundColor: Colors.emerald,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    alignItems: 'center',
    paddingVertical: Metrics.doubleBaseMargin,
  },
  row: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.054)',
  },
  formContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  text: {
    fontSize: Fonts.size.input,
  },
  header: {
    fontSize: Fonts.size.h5,
  },
  addButton: {
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: Colors.charcoal,
    borderRadius: 100,
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
  },
  icon: {
    fontSize: 30,
    margin: 30,
  },
});

const createRowData = (d: Deck): RowData => {
  return {
    name: d.name,
    deckCount: d.cards.length,
  };
};
const mapStateToProps = (state: RootState) => ({
  decks: state.decks,
  rowData: R.map(createRowData, state.decks.allDecks),
});
const mapDispatchToProps = (dispatch) => ({
  createDeck: (name: string) => dispatch(actions.createAddDeckAction(name)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DecksScreen);
