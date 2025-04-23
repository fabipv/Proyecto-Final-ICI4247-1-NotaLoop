import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    // Redirecciona al home si la ruta no existe
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'notes',
    loadComponent: () => import('./pages/notes/notes.page').then( m => m.NotesPage)
  },
  {
    path: 'community',
    loadComponent: () => import('./pages/community/community.page').then( m => m.CommunityPage)
  },
  {
    path: 'questions',
    loadComponent: () => import('./pages/questions/questions.page').then( m => m.QuestionsPage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/edit-profile/edit-profile.page').then(m => m.EditProfilePage),
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./favoritos/favoritos.page').then( m => m.FavoritosPage)
  }


];
