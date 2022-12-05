using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class tempo : MonoBehaviour
{

    public Text displayContagem;

    public float contagem = 120.0f;


    void Start()
    {
        
    }

    // Update is called once per frame
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
        }
    }
}
