import React, { useContext, useState } from 'react'
import { Button, Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SignUpPng from '../../assets/SignUp.png'
import color from '../../theme/colors'
import font from '../../theme/font'
import userIcon from '../../assets/Icon/user.png'
import passwordIcon from '../../assets/Icon/password.png'
import { Link } from '@react-navigation/native'
import { SignIn as SignInCustomer } from '../../api/Customer/SignIn'
import { SignIn as SignInChef } from '../../api/Chef/SignIn'
import AppStateContext from '../../hook/AppStateContext'

const SignIn = ({ navigation }) => {

  const [email, setEmail] = useState('Testing1@gmail.com')
  const [password, setPassword] = useState('11111')
  const [asChef, setAsChef] = useState(false)
  const context = useContext(AppStateContext)
  const { setContextCurrentUser, setContextRole } = context

  const checkForm = ({email, password}) => {
    if (email != "" && password != "") {
      return true
    } else {
      alert('All Field Are Required!')
      return false
    }
  }

  const handleSubmit = () => {
    let formData = {
      email: email,
      password: password
    }
    if(checkForm(formData)) {
      console.log('Sign In as ', asChef ? 'chef' : 'customer' )
      if(asChef) {
        SignInChef(formData).then(data => {
          if(data?.success) {
            console.log('SignUp Success')
            setContextCurrentUser(data.message)
            setContextRole('Chef')
            navigation.navigate('Home')
          } else {
            console.log('SignUp Failed', data?.message)
            alert(data?.message)
          }
        })
      }
      if(!asChef) {
        SignInCustomer(formData).then(data => {
          if(data?.success) {
            console.log('SignUp Success')
            setContextCurrentUser(data.message)
            setContextRole('Customer')
            navigation.navigate('Home')
          } else {
            console.log('SignUp Failed', data?.message)
            alert(data?.message)
          }
        })
      }

    }
  }

  return (
    <View style={{ width: '100%', height: '100%'}}>
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

        <View style={{ width: '100%', height: '100%', display: 'flex'}}>
          {/* <View style={{ width: '100%', height: '45%', position: 'relative' }}> */}
            <Image source={SignUpPng} style={{ width: '130%', height: '80%', top: 0, left: -55, zIndex: 1, overflow: 'visible' }} resizeMode="contain" />
          {/* </View> */}
          <View style={{ width: '100%', flex: 1, backgroundColor: 'white', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20, paddingBottom: 32, gap: 8}}>
            <Text htmlfor='legend' style={{ fontSize: 24, fontWeight: 'bold' }}>Sign In</Text>
            <View style={{ wdith: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 12 }}>
              <Switch
                trackColor={{false: color.secondary, true: color.black}}
                thumbColor={true ? color.primary : color.black}
                onValueChange={newValue => setAsChef(newValue)}
                value={asChef}
                // style={{ flex: 1 }}
              />
              <Text>Sign In as Chef?</Text>
            </View>
            {/* Email */}
            <Text htmlfor='label' style={{ fontSize: 18, }}>Email</Text>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 12, gap: 8, backgroundColor: '#F0F0F0', borderRadius: 8, }}>
              <Image source={userIcon} resizeMode="contain" style={{ width: 18, height: 18 }}/>
              <TextInput 
                placeholder='username@gmail.com' style={{ fontSize: 18, borderLeftWidth: 1, borderColor: '#4d4d4d', paddingHorizontal: 8}}
                value={email}
                onChangeText={setEmail}
                />
            </View>
            {/* Password */}
            <Text htmlfor='label' style={{ fontSize: 18, }}>Password</Text>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 12, gap: 8, backgroundColor: '#F0F0F0', borderRadius: 8 }}>
              <Image source={passwordIcon} resizeMode="contain" style={{ width: 18, height: 18 }}/>
              <TextInput
                secureTextEntry={true} placeholder='*****' style={{ fontSize: 18, borderLeftWidth: 1, borderColor: '#4d4d4d', paddingHorizontal: 8}}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <Text style={{ width: '100%', textAlign: 'center'}}>Don't have an account yet? <Link to={{ screen: 'SignUp'}} style={{ color: color.primary, textDecorationLine: 'underline' }}>Sign Up</Link></Text>
            <TouchableOpacity
              style={{ ...styles.button}}
              onPress={() => {
                handleSubmit()
                navigation.navigate('Home')
              }}
            >
              <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '500' }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 56,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 24,
    paddingBottom: 500
  },
  button: {
    marginTop: 'auto',
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: color.primary,
    shadowOffset: {width: 0, height: 5},  
    shadowColor: color.shadowGreen,  
    shadowOpacity: 1,
    shadowRadius: 0,
  }
})