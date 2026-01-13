# Portfolio CMS - Admin Panel Guide

## 🚀 New Features

### 1. **Image Upload Fix**
- ✅ **Project Images**: You can now upload images directly when adding or editing projects
- ✅ **Achievement Images**: Upload images for your achievements
- ✅ Images are automatically saved to the backend and served correctly

### 2. **Content Management System (CMS)**
- ✅ **Edit Everything**: Modify all portfolio content without touching code
- ✅ **Real-time Updates**: Changes are saved to the database instantly
- ✅ **User-friendly Interface**: Clean, intuitive admin interface

---

## 📋 How to Use

### **Accessing the Admin Panel**

1. **Login**: Navigate to `/admin/login`
   - **Email**: `admin@adarisamuelprasad.com`
   - **Password**: `admin123`

2. **Dashboard**: After login, you'll see the admin dashboard at `/admin`

---

## 🎨 Content Manager

### **Access Content Manager**
Click the **"Manage Content"** button in the admin header to access the Content Management System.

### **Editable Sections**

#### **🏠 Home Page**
- **Full Name**: Your display name
- **Headline**: Primary tagline (e.g., "Java Developer | Spring Boot Developer")
- **Subheadline**: Secondary tagline (e.g., "AI & ML Enthusiast")
- **Description**: Your introduction paragraph
- **Profile Image**: Upload your profile photo
- **Availability Status**: Current status (e.g., "Available for opportunities")

#### **👤 About**
- **Section Title**: Title for the about section
- **About Me**: Your personal/professional description
- **Mission Statement**: Your professional mission
- **Years of Experience**: How long you've been in the field

#### **💼 Skills**
- **Section Title**: Title for skills section
- **Skills Description**: Overview of your technical skills

#### **📧 Contact**
- **Email**: Your contact email
- **Phone**: Your phone number
- **Location**: Your location
- **LinkedIn URL**: Your LinkedIn profile
- **GitHub URL**: Your GitHub profile

### **How to Edit**

1. **Select a Section**: Click on the section you want to edit (Home, About, Skills, Contact)
2. **Edit Fields**: Modify the content in the input fields
3. **Upload Images**: Click "Choose File" to upload images (for image fields)
4. **Save**: Click "Save All" button at the top to persist changes

---

## 📁 Projects Management

### **Add New Project**
1. Click **"Add Project"** button
2. Fill in the details:
   - Title
   - Description
   - Technologies (comma-separated)
   - GitHub URL
   - Live URL
   - **Project Image** (now working! 🎉)
3. Click **Save**

### **Edit Project**
1. Click the **Edit** button on any project card
2. Modify the fields
3. Change or upload a new image if needed
4. Click **Save**

### **Delete Project**
- Click the **Delete** button on any project card
- Confirm deletion

---

## 🏆 Achievements Management

### **Add New Achievement**
1. Click **"Add Achievement"** button
2. Fill in the details:
   - Title
   - Year
   - Description
   - **Achievement Image** (optional)
3. Click **Save**

### **Edit Achievement**
1. Click the **Edit** button on any achievement card
2. Modify the fields
3. Upload or change the image
4. Click **Save**

### **Delete Achievement**
- Click the **Delete** button on any achievement card
- Confirm deletion

---

## 🔧 Technical Details

### **Backend APIs**

#### **Content API**
- `GET /api/content` - Get all content
- `GET /api/content/{section}` - Get content by section
- `POST /api/content` - Create new content
- `PUT /api/content/{id}` - Update content
- `DELETE /api/content/{id}` - Delete content
- `PUT /api/content/bulk` - Bulk update

#### **Projects API**
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

#### **Achievements API**
- `GET /api/achievements` - Get all achievements
- `POST /api/achievements` - Create achievement
- `PUT /api/achievements/{id}` - Update achievement
- `DELETE /api/achievements/{id}` - Delete achievement

#### **Upload API**
- `POST /api/upload` - Upload image file
- Returns: `{ "url": "http://localhost:9090/uploads/filename.jpg" }`

### **Database Collections**
- `portfolio_content` - Stores all editable content
- `projects` - Stores project information
- `achievements` - Stores achievements

### **Image Storage**
- Images are stored in the `uploads/` directory
- Served via `/uploads/**` endpoint
- Accessible at `http://localhost:9090/uploads/{filename}`

---

## 🎯 Benefits

✅ **No Code Required**: Edit all content through the admin panel
✅ **Instant Updates**: Changes reflect immediately in the database
✅ **Persistent Storage**: All data is stored in MongoDB
✅ **Image Support**: Easy image uploads with preview
✅ **Organized**: Content grouped by sections for easy management
✅ **Scalable**: Easy to add new sections or fields

---

## 🔐 Security Notes

⚠️ **Important**: The current implementation uses basic hardcoded authentication for demo purposes.

**For Production**, you should:
1. Implement proper JWT authentication
2. Hash passwords
3. Add role-based access control
4. Use environment variables for credentials
5. Enable HTTPS
6. Add CSRF protection

---

## 🐛 Troubleshooting

### **Images Not Displaying?**
- Check if the `uploads/` directory exists in the project root
- Verify the image URL in the database
- Ensure the backend server is running on port 9090

### **Content Not Saving?**
- Check browser console for errors
- Verify backend is running
- Check MongoDB connection

### **Login Issues?**
- Ensure credentials are correct
- Check if AuthContext is properly configured
- Verify CORS settings in backend

---

## 📝 Future Enhancements

Potential features to add:
- 📊 Analytics dashboard
- 🎨 Theme customization
- 📱 Responsive preview
- 🔄 Version history
- 📥 Export/Import functionality
- 🌐 Multi-language support

---

## 📞 Support

If you encounter any issues or have questions, please check:
1. Backend console logs
2. Frontend browser console
3. Network tab in browser DevTools
4. MongoDB connection status

---

**Happy Content Managing! 🎉**
