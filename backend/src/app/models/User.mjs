import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    index: true,
  },
  last_name: {
    type: String,
    required: [true, "Last Name is required!"],
    index: true,
  },
  phone: {
    type: String,
    required: false,
    validate: {
      validator: function(value) {
          // Pass if is null or undefined
          if (! value) return true;

          // Must be a number and have 10 digits
          return /^\d{10}$/.test(value);
      },
      message: props => "Invalid phone number! It must be a 10-digit number."
    }
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: () => 'Email is not valid!',
    }
  },
  password: {
    type: String,
    required: [true, "Password is required!"]
  }
}, 
  {
    // createdAt, updatedAt
    timestamps: true,
    methods: {
      // Hide password when call "toJSON"
      toJSON() {
        const obj = this.toObject();
        delete obj.password;
        return obj;
      }
    }
  }
);



// Observer "on save, on create"
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

export default mongoose.model("User", userSchema);