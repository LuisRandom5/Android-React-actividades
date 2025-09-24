package com.example.calculadoraimc;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;
import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    // Declarar las variables de los componentes
    private EditText editMontoCuenta;
    private EditText editNumPersonas;
    private RadioGroup radioGroupPropina;
    private RadioButton radio5, radio10, radio15;
    private Button btnCalcular;
    private TextView txtResultados;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        // Configurar los insets para Edge-to-Edge
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // Inicializar los componentes
        inicializarComponentes();

        // Configurar el listener del botón calcular
        btnCalcular.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calcularPropina();
            }
        });
    }

    // Método para inicializar los componentes
    private void inicializarComponentes() {
        editMontoCuenta = findViewById(R.id.editMontoCuenta);
        editNumPersonas = findViewById(R.id.editNumPersonas);
        radioGroupPropina = findViewById(R.id.radioGroupPropina);
        radio5 = findViewById(R.id.radio5);
        radio10 = findViewById(R.id.radio10);
        radio15 = findViewById(R.id.radio15);
        btnCalcular = findViewById(R.id.btnCalcular);
        txtResultados = findViewById(R.id.txtResultados);
    }

    // Método para calcular la propina
    private void calcularPropina() {
        try {
            // Obtener los valores de los campos
            String montoStr = editMontoCuenta.getText().toString().trim();
            String personasStr = editNumPersonas.getText().toString().trim();

            // Validar que los campos no estén vacíos
            if (montoStr.isEmpty() || personasStr.isEmpty()) {
                Toast.makeText(this, "Por favor, llena todos los campos", Toast.LENGTH_SHORT).show();
                return;
            }

            double montoCuenta = Double.parseDouble(montoStr);
            int numPersonas = Integer.parseInt(personasStr);

            // Validar que los valores sean válidos
            if (montoCuenta <= 0) {
                Toast.makeText(this, "El monto de la cuenta debe ser mayor a cero", Toast.LENGTH_SHORT).show();
                return;
            }

            if (numPersonas <= 0) {
                Toast.makeText(this, "El número de personas debe ser mayor a cero", Toast.LENGTH_SHORT).show();
                return;
            }

            // Obtener el porcentaje de propina seleccionado
            double porcentajePropina = obtenerPorcentajePropina();

            // Calcular propina y totales
            double propina = montoCuenta * (porcentajePropina / 100);
            double totalConPropina = montoCuenta + propina;
            double propinaPerPersona = propina / numPersonas;
            double totalPerPersona = totalConPropina / numPersonas;

            // Mostrar los resultados
            mostrarResultados(montoCuenta, propina, totalConPropina,
                    propinaPerPersona, totalPerPersona,
                    numPersonas, porcentajePropina);

        } catch (NumberFormatException e) {
            Toast.makeText(this, "Por favor, ingresa valores numéricos válidos", Toast.LENGTH_SHORT).show();
        }
    }

    // Método para obtener el porcentaje de propina seleccionado
    private double obtenerPorcentajePropina() {
        int selectedId = radioGroupPropina.getCheckedRadioButtonId();

        if (selectedId == R.id.radio5) {
            return 5.0;
        } else if (selectedId == R.id.radio10) {
            return 10.0;
        } else if (selectedId == R.id.radio15) {
            return 15.0;
        }

        // Por defecto, retorna 10% si ninguno está seleccionado
        return 10.0;
    }

    // Método para mostrar los resultados formateados
    private void mostrarResultados(double montoCuenta, double propina, double totalConPropina,
                                   double propinaPerPersona, double totalPerPersona,
                                   int numPersonas, double porcentajePropina) {

        StringBuilder resultado = new StringBuilder();
        resultado.append("Resumen\n\n");
        resultado.append(String.format("Cuenta original: $%.2f\n", montoCuenta));
        resultado.append(String.format("Propina (%.0f%%): $%.2f\n", porcentajePropina, propina));
        resultado.append(String.format("Total con propina: $%.2f\n\n", totalConPropina));

        resultado.append("👥 DIVISIÓN ENTRE PERSONAS 👥\n\n");
        resultado.append(String.format("Número de personas: %d\n", numPersonas));
        resultado.append(String.format("Propina por persona: $%.2f\n", propinaPerPersona));
        resultado.append(String.format("Total por persona: $%.2f", totalPerPersona));

        txtResultados.setText(resultado.toString());
    }
}