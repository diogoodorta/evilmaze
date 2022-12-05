using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class tempo : MonoBehaviour
{

    public Text displayContagem;

    public float contagem = 50f;


    void Start()
    {
        
    }

    void Update()
    {
        if(contagem > 0.0f)
        {
           contagem -= Time.deltaTime;
           displayContagem.text = contagem.ToString("F0");
        }

        else
        {
           displayContagem.text = "Adeus";

           SceneManager.LoadScene("Game Over");
        }
    }
}
