import { StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
    topContainer: {
      flex: 1,
      
      justifyContent: "flex-start",
    },
    fab: {
      position: 'absolute',
      margin: 32,
      right: 0,
      bottom: 0,
      borderColor: 'black',
      borderWidth: 1 },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: "center",
      marginVertical: 15,
    },
    imageButtonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginRight: "2.5%"
    },
    imageButton: {
        width: 28,
        height: 28,
        marginHorizontal: "1%"
    },
    flatlistHeader: {
      fontSize: 20,
      marginLeft: '2.5%'
    },
    numberInput: {
      fontSize: 20,
      borderBottomWidth: 1,
      textAlign: 'center',
      width: 60,
      },
})

export default globalStyles