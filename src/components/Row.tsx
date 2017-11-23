import * as React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Platform} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}
function Row({title, onPress}) {

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={'rgba(0, 0, 0, 0.054)'}
    >
      <View style={styles.row}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.054)',
  },
  text: {
    fontSize: 16,
  },
});

export default Row;
