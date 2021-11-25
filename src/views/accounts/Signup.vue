<template>
	<v-dialog
			transition="dialog-top-transition"
			max-width="1000"
		>
    <template v-slot:activator="{ on, attrs }">
      <button
        id="visual-btn"
        v-bind="attrs"
        v-on="on"
      >Signup</button>
    </template>
    <template v-slot:default="dialog">
      <v-card 
        style=
        "
          width: 1000px;
        "
      >
        <v-toolbar
          style="background: var(--background-color);"
          dark
        >Signup
        </v-toolbar>
        <v-card-text style="background: var(--white-color);">
          <div class="form-container" style="background: var(--white-color);">
             <v-form
								ref="form"
								v-model="valid"
								lazy-validation
							>
								<v-text-field
									v-model="credentials.username"
									:counter="16"
									:rules="[rules.required, rules.min]"
									label="username"
									required
								></v-text-field>

                <v-text-field
                  v-model="credentials.password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="password"
                  hint="At least 6 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>

								<v-text-field
                  v-model="credentials.passwordConfirmation"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min, rules.passwordMatch]"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-1"
                  label="passwordConfirmation"
                  hint="At least 6 characters"
                  counter
                  @click:append="show2 = !show2"
                ></v-text-field>

								<v-btn
									:disabled="!valid"
									color="success"
									class="mr-4"
									@click="signup"
								>
									Signup
								</v-btn>

								<v-btn
									color="error"
									class="mr-4"
									@click="reset"
								>
									Reset Form
								</v-btn>
							</v-form>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end" style="background: var(--background-color);">
          <v-btn
            text
            @click="dialog.value = false"
            style="color: var(--white-color);"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
	data: function() {
    return {
      credentials: {
        username: '',
        password: '',
        passwordConfirmation: '',
      },
      show1: false,
      show2: false,
      valid: true,
      rules : {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        passwordMatch: () => this.credentials.password === this.credentials.passwordConfirmation || (`비밀번호가 일치하지 않습니다.`),
      },
    }
  },
	methods: {
		validate () {
			this.$refs.form.validate()
		},
		reset () {
			this.$refs.form.reset()
		},

		signup: function () {
      axios({
        method: 'post',
        url: 'https://jongil.click/accounts/signup/',
        data: this.credentials
      })
        .then(() => {
          alert('로그인 후 사용해주세요.')
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    }
	},
}
</script>