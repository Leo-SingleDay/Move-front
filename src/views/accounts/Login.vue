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
      >Login</button>
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
        >Login
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

								<v-btn
									:disabled="!valid"
									color="success"
									class="mr-4"
									@click="login"
								>
									Login
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
  name: 'Login',
	data: function() {
    return {
      credentials: {
        username: '',
        password: '',
      },
      show1: false,
      valid: true,
      rules : {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
      },
    }
  },
	methods: {
		login: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
        data: this.credentials,
      })
        .then(res => {
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$router.push({ name: 'Movies'})
        })
        .catch(() => {
          this.credentials.username = ''
          this.credentials.password = ''
          alert('회원정보를 다시 확인해주세요.')
        })
    }
	},
}
</script>