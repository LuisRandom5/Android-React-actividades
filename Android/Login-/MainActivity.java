package com.ejemplo.loginapp;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import com.google.android.material.textfield.TextInputEditText;

public class LoginActivity extends AppCompatActivity {

    // Credenciales predeterminadas
    private static final String USUARIO_CORRECTO = "admin";
    private static final String CONTRASENA_CORRECTA = "123456";

    private TextInputEditText etUsuario, etContrasena;
    private TextView tvMensaje;
    private Button btnLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        inicializarViews();
        configurarListeners();
    }

    private void inicializarViews() {
        etUsuario = findViewById(R.id.etUsuario);
        etContrasena = findViewById(R.id.etContrasena);
        tvMensaje = findViewById(R.id.tvMensaje);
        btnLogin = findViewById(R.id.btnLogin);
    }

    private void configurarListeners() {
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                validarLogin();
            }
        });
    }

    private void validarLogin() {
        String usuario = etUsuario.getText().toString().trim();
        String contrasena = etContrasena.getText().toString().trim();

        // Validar campos vacíos
        if (TextUtils.isEmpty(usuario)) {
            mostrarMensajeError("El campo usuario es obligatorio");
            etUsuario.requestFocus();
            return;
        }

        if (TextUtils.isEmpty(contrasena)) {
            mostrarMensajeError("El campo contraseña es obligatorio");
            etContrasena.requestFocus();
            return;
        }

        // Validar credenciales
        if (usuario.equals(USUARIO_CORRECTO) && contrasena.equals(CONTRASENA_CORRECTA)) {
            mostrarMensajeExito("¡Acceso correcto! Bienvenido");
            // Aquí podrías navegar a otra actividad
            limpiarCampos();
        } else {
            mostrarMensajeError("Usuario o contraseña incorrectos");
            limpiarCampos();
        }
    }

    private void mostrarMensajeError(String mensaje) {
        tvMensaje.setText(mensaje);
        tvMensaje.setTextColor(ContextCompat.getColor(this, R.color.error_color));
        tvMensaje.setBackgroundColor(ContextCompat.getColor(this, R.color.error_background));
        tvMensaje.setVisibility(View.VISIBLE);
        
        // Ocultar mensaje después de 3 segundos
        tvMensaje.postDelayed(new Runnable() {
            @Override
            public void run() {
                tvMensaje.setVisibility(View.GONE);
            }
        }, 3000);
    }

    private void mostrarMensajeExito(String mensaje) {
        tvMensaje.setText(mensaje);
        tvMensaje.setTextColor(ContextCompat.getColor(this, R.color.success_color));
        tvMensaje.setBackgroundColor(ContextCompat.getColor(this, R.color.success_background));
        tvMensaje.setVisibility(View.VISIBLE);
        
        // Ocultar mensaje después de 3 segundos
        tvMensaje.postDelayed(new Runnable() {
            @Override
            public void run() {
                tvMensaje.setVisibility(View.GONE);
            }
        }, 3000);
    }

    private void limpiarCampos() {
        etUsuario.setText("");
        etContrasena.setText("");
    }
}